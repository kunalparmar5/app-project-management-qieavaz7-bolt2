// File upload utilities and validation functions

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export interface UploadConfig {
  maxFileSize: number; // in bytes
  allowedTypes: string[];
  maxFiles: number;
  uploadEndpoint: string;
}

export const DEFAULT_UPLOAD_CONFIG: UploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    'image/jpeg',
    'image/png', 
    'image/webp',
    'application/pdf'
  ],
  maxFiles: 20,
  uploadEndpoint: '/api/upload'
};

// MIME type validation with additional security checks
export const validateFileType = (file: File): FileValidationResult => {
  const { allowedTypes } = DEFAULT_UPLOAD_CONFIG;
  
  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed. Supported types: ${allowedTypes.join(', ')}`
    };
  }

  // Additional security: Check file extension matches MIME type
  const extension = file.name.toLowerCase().split('.').pop();
  const mimeToExtension: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
    'application/pdf': ['pdf']
  };

  const expectedExtensions = mimeToExtension[file.type];
  if (expectedExtensions && extension && !expectedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `File extension "${extension}" doesn't match the file type "${file.type}"`
    };
  }

  return { valid: true };
};

export const validateFileSize = (file: File): FileValidationResult => {
  const { maxFileSize } = DEFAULT_UPLOAD_CONFIG;
  
  if (file.size > maxFileSize) {
    const maxSizeMB = maxFileSize / (1024 * 1024);
    const fileSizeMB = file.size / (1024 * 1024);
    return {
      valid: false,
      error: `File size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size of ${maxSizeMB}MB`
    };
  }

  return { valid: true };
};

export const validateFileName = (fileName: string): FileValidationResult => {
  // Check for potentially dangerous characters
  const dangerousChars = /[<>:"/\\|?*\x00-\x1f]/;
  if (dangerousChars.test(fileName)) {
    return {
      valid: false,
      error: 'File name contains invalid characters'
    };
  }

  // Check file name length
  if (fileName.length > 255) {
    return {
      valid: false,
      error: 'File name is too long (maximum 255 characters)'
    };
  }

  return { valid: true };
};

export const generateSecureFileName = (originalName: string, propertyId?: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.toLowerCase().split('.').pop();
  const baseName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, '_');
  
  const prefix = propertyId ? `${propertyId}_` : '';
  return `${prefix}${timestamp}_${randomString}_${baseName}.${extension}`;
};

export const createImageThumbnail = (
  file: File, 
  maxWidth: number = 200, 
  maxHeight: number = 200,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create thumbnail'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileCategory = (mimeType: string): 'image' | 'document' | 'other' => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'document';
  return 'other';
};

// Upload progress tracking
export class UploadProgressTracker {
  private xhr: XMLHttpRequest;
  private onProgress?: (progress: number) => void;
  private onComplete?: (response: any) => void;
  private onError?: (error: Error) => void;

  constructor(
    onProgress?: (progress: number) => void,
    onComplete?: (response: any) => void,
    onError?: (error: Error) => void
  ) {
    this.xhr = new XMLHttpRequest();
    this.onProgress = onProgress;
    this.onComplete = onComplete;
    this.onError = onError;
  }

  upload(url: string, formData: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          this.onProgress?.(progress);
        }
      });

      this.xhr.addEventListener('load', () => {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
          try {
            const response = JSON.parse(this.xhr.responseText);
            this.onComplete?.(response);
            resolve(response);
          } catch (error) {
            const parseError = new Error('Invalid response format');
            this.onError?.(parseError);
            reject(parseError);
          }
        } else {
          const error = new Error(`Upload failed: ${this.xhr.statusText}`);
          this.onError?.(error);
          reject(error);
        }
      });

      this.xhr.addEventListener('error', () => {
        const error = new Error('Network error during upload');
        this.onError?.(error);
        reject(error);
      });

      this.xhr.open('POST', url);
      this.xhr.send(formData);
    });
  }

  abort(): void {
    this.xhr.abort();
  }
}