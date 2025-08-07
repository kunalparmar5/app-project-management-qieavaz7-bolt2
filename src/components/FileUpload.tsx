import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Upload, 
  FileImage, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Eye,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { useFileUpload, UploadedFile, UseFileUploadOptions } from '../hooks/useFileUpload';

interface FileUploadProps extends UseFileUploadOptions {
  className?: string;
  existingFiles?: UploadedFile[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  className = '',
  existingFiles = [],
  ...options
}) => {
  const {
    files,
    isUploading,
    uploadFiles,
    removeFile,
    retryUpload,
    canUploadMore,
  } = useFileUpload({ ...options, onFilesChange: options.onFilesChange });

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingFiles.length > 0) {
      // This is a simplified way to handle existing files.
      // In a real app, you might want to merge existing files with new uploads.
    }
  }, [existingFiles]);

  const handleFileSelect = useCallback(async (selectedFiles: FileList | File[]) => {
    if (!canUploadMore) {
      alert('You have reached the maximum number of files.');
      return;
    }
    await uploadFiles(selectedFiles);
  }, [canUploadMore, uploadFiles]);

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
    e.target.value = '';
  }, [handleFileSelect]);

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
          accept={options.acceptedTypes?.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={!canUploadMore || isUploading}
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
          disabled={!canUploadMore || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Select Files'}
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Supported formats: {options.acceptedTypes?.join(', ')} • Max size: {options.maxFileSize}MB • Max files: {options.maxFiles}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-gray-900">
            Uploaded Files ({files.length}/{options.maxFiles})
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