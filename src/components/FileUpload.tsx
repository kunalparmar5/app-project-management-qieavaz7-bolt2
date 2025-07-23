import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  X, 
  FileImage, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Eye,
  Trash2,
  RotateCcw
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  thumbnailUrl?: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
  category: 'image' | 'document';
}

interface FileUploadProps {
  propertyId?: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  onFilesChange?: (files: UploadedFile[]) => void;
  existingFiles?: UploadedFile[];
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  propertyId,
  maxFiles = 20,
  maxFileSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  onFilesChange,
  existingFiles = [],
  className = ''
}) => {
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllers = useRef<Map<string, AbortController>>(new Map());

  const generateFileId = () => `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `File type ${file.type} is not supported. Accepted types: ${acceptedTypes.join(', ')}` 
      };
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return { 
        valid: false, 
        error: `File size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size of ${maxFileSize}MB` 
      };
    }

    // Check total files limit
    if (files.length >= maxFiles) {
      return { 
        valid: false, 
        error: `Maximum ${maxFiles} files allowed` 
      };
    }

    return { valid: true };
  };

  const createThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        resolve('');
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate thumbnail dimensions (max 200x200)
        const maxSize = 200;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };

      img.onerror = () => reject(new Error('Failed to create thumbnail'));
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    const fileId = generateFileId();
    const controller = new AbortController();
    abortControllers.current.set(fileId, controller);

    // Create initial file object
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      url: '',
      uploadProgress: 0,
      status: 'uploading',
      category: file.type.startsWith('image/') ? 'image' : 'document'
    };

    // Generate thumbnail for images
    if (file.type.startsWith('image/')) {
      try {
        uploadedFile.thumbnailUrl = await createThumbnail(file);
      } catch (error) {
        console.warn('Failed to create thumbnail:', error);
      }
    }

    // Add to files list immediately to show upload progress
    setFiles(prev => [...prev, uploadedFile]);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('propertyId', propertyId || '');
      formData.append('category', uploadedFile.category);

      // Simulate upload progress (in real implementation, use XMLHttpRequest for progress tracking)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      // Update file with success data
      const completedFile: UploadedFile = {
        ...uploadedFile,
        url: result.url,
        thumbnailUrl: result.thumbnailUrl || uploadedFile.thumbnailUrl,
        uploadProgress: 100,
        status: 'completed'
      };

      setFiles(prev => prev.map(f => f.id === fileId ? completedFile : f));
      return completedFile;

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Upload was cancelled
        setFiles(prev => prev.filter(f => f.id !== fileId));
        throw error;
      }

      // Update file with error
      const errorFile: UploadedFile = {
        ...uploadedFile,
        status: 'error',
        error: error instanceof Error ? error.message : 'Upload failed'
      };

      setFiles(prev => prev.map(f => f.id === fileId ? errorFile : f));
      throw error;
    } finally {
      abortControllers.current.delete(fileId);
    }
  };

  const handleFileSelect = useCallback(async (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Validate each file
    for (const file of fileArray) {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    }

    // Show validation errors
    if (errors.length > 0) {
      alert(`Some files were rejected:\n${errors.join('\n')}`);
    }

    // Upload valid files
    for (const file of validFiles) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    // Notify parent component
    onFilesChange?.(files);
  }, [files, maxFiles, maxFileSize, acceptedTypes, onFilesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileSelect(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [handleFileSelect]);

  const removeFile = async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Cancel upload if in progress
    const controller = abortControllers.current.get(fileId);
    if (controller) {
      controller.abort();
    }

    // If file was successfully uploaded, delete from server
    if (file.status === 'completed' && file.url) {
      try {
        await fetch(`/api/upload/${fileId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Failed to delete file from server:', error);
      }
    }

    // Remove from local state
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const retryUpload = async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file || file.status !== 'error') return;

    // Create a new File object from the original data (this is simplified)
    // In a real implementation, you'd need to store the original File object
    console.log('Retry upload for:', file.name);
  };

  const openFilePreview = (file: UploadedFile) => {
    if (file.url) {
      window.open(file.url, '_blank');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: UploadedFile) => {
    if (file.category === 'image') {
      return <FileImage className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Upload Property Files
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop files here, or click to select files
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Select Files
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Supported formats: JPG, PNG, WEBP, PDF • Max size: {maxFileSize}MB • Max files: {maxFiles}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-900">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  {/* File Icon/Thumbnail */}
                  <div className="flex-shrink-0">
                    {file.thumbnailUrl ? (
                      <img
                        src={file.thumbnailUrl}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getFileIcon(file)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </p>

                    {/* Status */}
                    <div className="mt-2">
                      {file.status === 'uploading' && (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="text-sm text-blue-600">
                            Uploading... {file.uploadProgress}%
                          </span>
                        </div>
                      )}
                      
                      {file.status === 'completed' && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">Uploaded</span>
                        </div>
                      )}
                      
                      {file.status === 'error' && (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-600">
                            {file.error || 'Upload failed'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    {file.status === 'completed' && (
                      <button
                        onClick={() => openFilePreview(file)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    
                    {file.status === 'error' && (
                      <button
                        onClick={() => retryUpload(file.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Retry"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;