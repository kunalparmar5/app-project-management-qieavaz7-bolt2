import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  File, 
  Image, 
  FileText, 
  Download, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Grid,
  List,
  Upload,
  FolderPlus,
  MoreVertical
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size?: number;
  url?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  modifiedAt: Date;
  category?: 'image' | 'document' | 'other';
  propertyId?: string;
}

interface FileManagerProps {
  propertyId?: string;
  onFileSelect?: (file: FileItem) => void;
  onFileDelete?: (fileId: string) => void;
  onFileUpload?: (files: FileList) => void;
  className?: string;
}

const FileManager: React.FC<FileManagerProps> = ({
  propertyId,
  onFileSelect,
  onFileDelete,
  onFileUpload,
  className = ''
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'images' | 'documents'>('all');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockFiles: FileItem[] = [
      {
        id: '1',
        name: 'Property Photos',
        type: 'folder',
        createdAt: new Date('2024-01-15'),
        modifiedAt: new Date('2024-01-20'),
        propertyId
      },
      {
        id: '2',
        name: 'Documents',
        type: 'folder',
        createdAt: new Date('2024-01-10'),
        modifiedAt: new Date('2024-01-18'),
        propertyId
      },
      {
        id: '3',
        name: 'living-room.jpg',
        type: 'file',
        mimeType: 'image/jpeg',
        size: 2048000,
        url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        thumbnailUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=200',
        category: 'image',
        createdAt: new Date('2024-01-20'),
        modifiedAt: new Date('2024-01-20'),
        propertyId
      },
      {
        id: '4',
        name: 'floor-plan.pdf',
        type: 'file',
        mimeType: 'application/pdf',
        size: 512000,
        url: '/documents/floor-plan.pdf',
        category: 'document',
        createdAt: new Date('2024-01-18'),
        modifiedAt: new Date('2024-01-18'),
        propertyId
      }
    ];
    
    setFiles(mockFiles);
  }, [propertyId]);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'images' && file.category === 'image') ||
      (filterType === 'documents' && file.category === 'document');
    
    return matchesSearch && matchesFilter;
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') return <Folder className="h-8 w-8 text-blue-500" />;
    if (file.category === 'image') return <Image className="h-8 w-8 text-green-500" />;
    if (file.category === 'document') return <FileText className="h-8 w-8 text-red-500" />;
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath(`${currentPath}${file.name}/`);
    } else {
      onFileSelect?.(file);
    }
  };

  const handleFileSelect = (fileId: string, selected: boolean) => {
    const newSelected = new Set(selectedFiles);
    if (selected) {
      newSelected.add(fileId);
    } else {
      newSelected.delete(fileId);
    }
    setSelectedFiles(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredFiles.map(f => f.id)));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.size === 0) return;
    
    const confirmed = window.confirm(`Delete ${selectedFiles.size} selected items?`);
    if (confirmed) {
      selectedFiles.forEach(fileId => {
        onFileDelete?.(fileId);
      });
      setFiles(prev => prev.filter(f => !selectedFiles.has(f.id)));
      setSelectedFiles(new Set());
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileUpload?.(files);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">File Manager</h3>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </label>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <FolderPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Files</option>
              <option value="images">Images</option>
              <option value="documents">Documents</option>
            </select>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedFiles.size > 0 && (
          <div className="mt-4 flex items-center justify-between bg-blue-50 rounded-lg p-3">
            <span className="text-sm text-blue-700">
              {selectedFiles.size} item{selectedFiles.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDeleteSelected}
                className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-100 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No files found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`relative group cursor-pointer rounded-lg border-2 transition-colors ${
                  selectedFiles.has(file.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleFileClick(file)}
              >
                <div className="p-4 text-center">
                  {file.type === 'file' && file.thumbnailUrl ? (
                    <img
                      src={file.thumbnailUrl}
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      {getFileIcon(file)}
                    </div>
                  )}
                  
                  <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                    {file.name}
                  </p>
                  
                  {file.size && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(file.size)}
                    </p>
                  )}
                </div>

                {/* Selection Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedFiles.has(file.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleFileSelect(file.id, e.target.checked);
                  }}
                  className="absolute top-2 left-2 rounded border-gray-300"
                />

                {/* Actions Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={selectedFiles.size === filteredFiles.length && filteredFiles.length > 0}
                onChange={handleSelectAll}
                className="mr-3 rounded border-gray-300"
              />
              <div className="flex-1">Name</div>
              <div className="w-24 text-center">Size</div>
              <div className="w-32 text-center">Modified</div>
              <div className="w-20"></div>
            </div>
            
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`flex items-center py-3 px-3 rounded-lg transition-colors ${
                  selectedFiles.has(file.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFiles.has(file.id)}
                  onChange={(e) => handleFileSelect(file.id, e.target.checked)}
                  className="mr-3 rounded border-gray-300"
                />
                
                <div className="flex items-center flex-1 min-w-0">
                  <div className="mr-3 flex-shrink-0">
                    {file.thumbnailUrl ? (
                      <img
                        src={file.thumbnailUrl}
                        alt={file.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(file)
                    )}
                  </div>
                  <span
                    className="text-sm font-medium text-gray-900 truncate cursor-pointer hover:text-blue-600"
                    onClick={() => handleFileClick(file)}
                  >
                    {file.name}
                  </span>
                </div>
                
                <div className="w-24 text-center text-sm text-gray-500">
                  {file.size ? formatFileSize(file.size) : '-'}
                </div>
                
                <div className="w-32 text-center text-sm text-gray-500">
                  {file.modifiedAt.toLocaleDateString()}
                </div>
                
                <div className="w-20 flex items-center justify-end space-x-1">
                  {file.url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(file.url, '_blank');
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileDelete?.(file.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;