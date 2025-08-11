import { useState, useCallback, useRef } from 'react';
import { 
  validateFileType, 
  validateFileSize, 
  validateFileName,
  generateSecureFileName,
  createImageThumbnail,
  getFileCategory,
  UploadProgressTracker,
  DEFAULT_UPLOAD_CONFIG
} from '../utils/fileUpload';

export interface UploadedFile {
  id: string;
  name: string;
  originalName: string;
  size: number;
  type: string;
  url: string;
  thumbnailUrl?: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
  category: 'image' | 'document' | 'other';
  propertyId?: string;
  createdAt: Date;
}

export interface UseFileUploadOptions {
  propertyId?: string;
  maxFiles?: number;
  maxFileSize?: number;
  acceptedTypes?: string[];
  uploadEndpoint?: string;
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: Error, fileName: string) => void;
  onFilesChange?: (files: UploadedFile[]) => void;
}

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const {
    propertyId,
    maxFiles = DEFAULT_UPLOAD_CONFIG.maxFiles,
    uploadEndpoint = DEFAULT_UPLOAD_CONFIG.uploadEndpoint,
    onUploadComplete,
    onUploadError,
    onFilesChange
  } = options;

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const uploadTrackers = useRef<Map<string, UploadProgressTracker>>(new Map());

  const generateFileId = useCallback(() => {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Check file count limit
    if (files.length >= maxFiles) {
      return { valid: false, error: `Maximum ${maxFiles} files allowed` };
    }

    // Validate file name
    const nameValidation = validateFileName(file.name);
    if (!nameValidation.valid) {
      return nameValidation;
    }

    // Validate file type
    const typeValidation = validateFileType(file);
    if (!typeValidation.valid) {
      return typeValidation;
    }

    // Validate file size
    const sizeValidation = validateFileSize(file);
    if (!sizeValidation.valid) {
      return sizeValidation;
    }

    return { valid: true };
  }, [files.length, maxFiles]);

  const createFileObject = useCallback(async (file: File): Promise<UploadedFile> => {
    const fileId = generateFileId();
    const secureFileName = generateSecureFileName(file.name, propertyId);
    
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: secureFileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      url: '',
      uploadProgress: 0,
      status: 'uploading',
      category: getFileCategory(file.type),
      propertyId,
      createdAt: new Date()
    };

    // Generate thumbnail for images
    if (file.type.startsWith('image/')) {
      try {
        const thumbnailBlob = await createImageThumbnail(file);
        uploadedFile.thumbnailUrl = URL.createObjectURL(thumbnailBlob);
      } catch (error) {
        console.warn('Failed to create thumbnail:', error);
      }
    }

    return uploadedFile;
  }, [generateFileId, propertyId]);

  const uploadFile = useCallback(async (file: File): Promise<UploadedFile> => {
    const validation = validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const uploadedFile = await createFileObject(file);
    
    // Add file to state immediately to show upload progress
    setFiles(prev => {
      const updated = [...prev, uploadedFile];
      onFilesChange?.(updated);
      return updated;
    });

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', uploadedFile.name);
      formData.append('propertyId', propertyId || '');
      formData.append('category', uploadedFile.category);

      // Create upload tracker
      const tracker = new UploadProgressTracker(
        (progress) => {
          setFiles(prev => prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, uploadProgress: Math.round(progress) }
              : f
          ));
        },
        (response) => {
          const completedFile: UploadedFile = {
            ...uploadedFile,
            url: response.url,
            thumbnailUrl: response.thumbnailUrl || uploadedFile.thumbnailUrl,
            uploadProgress: 100,
            status: 'completed'
          };

          setFiles(prev => {
            const updated = prev.map(f => f.id === uploadedFile.id ? completedFile : f);
            onFilesChange?.(updated);
            return updated;
          });

          onUploadComplete?.(completedFile);
        },
        (error) => {
          const errorFile: UploadedFile = {
            ...uploadedFile,
            status: 'error',
            error: error.message
          };

          setFiles(prev => {
            const updated = prev.map(f => f.id === uploadedFile.id ? errorFile : f);
            onFilesChange?.(updated);
            return updated;
          });

          onUploadError?.(error, file.name);
        }
      );

      uploadTrackers.current.set(uploadedFile.id, tracker);

      // Start upload
      await tracker.upload(uploadEndpoint, formData);
      
      return uploadedFile;

    } catch (error) {
      // Remove file from state if upload setup failed
      setFiles(prev => {
        const updated = prev.filter(f => f.id !== uploadedFile.id);
        onFilesChange?.(updated);
        return updated;
      });
      
      throw error;
    } finally {
      uploadTrackers.current.delete(uploadedFile.id);
    }
  }, [
    validateFile, 
    createFileObject, 
    propertyId, 
    uploadEndpoint, 
    onUploadComplete, 
    onUploadError,
    onFilesChange
  ]);

  const uploadFiles = useCallback(async (fileList: FileList | File[]) => {
    const fileArray = Array.from(fileList);
    setIsUploading(true);

    const uploadPromises = fileArray.map(file => 
      uploadFile(file).catch(error => {
        console.error(`Failed to upload ${file.name}:`, error);
        return null;
      })
    );

    try {
      await Promise.all(uploadPromises);
    } finally {
      setIsUploading(false);
    }
  }, [uploadFile]);

  const removeFile = useCallback(async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Cancel upload if in progress
    const tracker = uploadTrackers.current.get(fileId);
    if (tracker) {
      tracker.abort();
      uploadTrackers.current.delete(fileId);
    }

    // Delete from server if upload was completed
    if (file.status === 'completed' && file.url) {
      try {
        await fetch(`${uploadEndpoint}/${fileId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Failed to delete file from server:', error);
      }
    }

    // Clean up thumbnail URL
    if (file.thumbnailUrl && file.thumbnailUrl.startsWith('blob:')) {
      URL.revokeObjectURL(file.thumbnailUrl);
    }

    // Remove from state
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      onFilesChange?.(updated);
      return updated;
    });
  }, [files, uploadEndpoint, onFilesChange]);

  const retryUpload = useCallback(async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file || file.status !== 'error') return;

    // Reset file status
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, status: 'uploading' as const, uploadProgress: 0, error: undefined }
        : f
    ));

    // Note: In a real implementation, you'd need to store the original File object
    // to retry the upload. This is a simplified version.
    console.log('Retry upload for:', file.originalName);
  }, [files]);

  const clearFiles = useCallback(() => {
    // Cancel all ongoing uploads
    uploadTrackers.current.forEach(tracker => tracker.abort());
    uploadTrackers.current.clear();

    // Clean up thumbnail URLs
    files.forEach(file => {
      if (file.thumbnailUrl && file.thumbnailUrl.startsWith('blob:')) {
        URL.revokeObjectURL(file.thumbnailUrl);
      }
    });

    setFiles([]);
    onFilesChange?.([]);
  }, [files, onFilesChange]);

  const getUploadStats = useCallback(() => {
    const total = files.length;
    const completed = files.filter(f => f.status === 'completed').length;
    const uploading = files.filter(f => f.status === 'uploading').length;
    const errors = files.filter(f => f.status === 'error').length;
    
    return { total, completed, uploading, errors };
  }, [files]);

  return {
    files,
    isUploading,
    uploadFile,
    uploadFiles,
    removeFile,
    retryUpload,
    clearFiles,
    getUploadStats,
    canUploadMore: files.length < maxFiles
  };
};