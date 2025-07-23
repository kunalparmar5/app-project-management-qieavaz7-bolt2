// Mock API endpoints for file upload functionality
// In a real application, these would be actual backend endpoints

export interface UploadResponse {
  success: boolean;
  url: string;
  thumbnailUrl?: string;
  fileId: string;
  fileName: string;
  size: number;
  type: string;
  message?: string;
}

export interface UploadError {
  success: false;
  error: string;
  code: string;
}

// Simulate file upload with progress tracking
export const uploadFile = async (
  file: File,
  propertyId: string,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 100) progress = 100;
      
      onProgress?.(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate successful upload response
        const response: UploadResponse = {
          success: true,
          url: `https://example.com/uploads/${propertyId}/${file.name}`,
          thumbnailUrl: file.type.startsWith('image/') 
            ? `https://example.com/uploads/${propertyId}/thumb_${file.name}`
            : undefined,
          fileId: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          fileName: file.name,
          size: file.size,
          type: file.type
        };
        
        // Simulate network delay
        setTimeout(() => resolve(response), 500);
      }
    }, 200);
  });
};

// Delete uploaded file
export const deleteFile = async (fileId: string): Promise<{ success: boolean }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true };
};

// Get file metadata
export const getFileMetadata = async (fileId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    id: fileId,
    name: 'example.jpg',
    size: 1024000,
    type: 'image/jpeg',
    uploadedAt: new Date().toISOString(),
    url: `https://example.com/uploads/${fileId}`
  };
};

// Batch upload multiple files
export const batchUpload = async (
  files: File[],
  propertyId: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<UploadResponse[]> => {
  const results: UploadResponse[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const result = await uploadFile(file, propertyId, (progress) => {
        onProgress?.(i, progress);
      });
      results.push(result);
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
    }
  }
  
  return results;
};