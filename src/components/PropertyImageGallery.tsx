import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2
} from 'lucide-react';

interface PropertyImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  category?: 'exterior' | 'interior' | 'amenity' | 'floor_plan' | 'other';
}

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  className?: string;
}

const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setZoom(1);
    setRotation(0);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const handleShare = async (imageUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Property Image',
          url: imageUrl
        });
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(imageUrl);
        alert('Image URL copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  if (images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        {/* Main Image */}
        <div className="relative">
          <img
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.title || `Property image ${currentIndex + 1}`}
            className="w-full h-96 object-cover cursor-pointer"
            onClick={() => openLightbox(currentIndex)}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Expand Button */}
          <button
            onClick={() => openLightbox(currentIndex)}
            className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
            title="View in fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image.thumbnailUrl || image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Controls */}
            <div className="absolute top-4 left-4 flex space-x-2 z-10">
              <button
                onClick={handleZoomOut}
                className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                onClick={handleZoomIn}
                className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                onClick={handleRotate}
                className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Rotate"
              >
                <RotateCw className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDownload(
                  images[lightboxIndex].url, 
                  `property-image-${lightboxIndex + 1}.jpg`
                )}
                className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleShare(images[lightboxIndex].url)}
                className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Main Image */}
            <img
              src={images[lightboxIndex]?.url}
              alt={images[lightboxIndex]?.title || `Property image ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`
              }}
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <p className="text-lg font-medium">
                {images[lightboxIndex]?.title || `Image ${lightboxIndex + 1} of ${images.length}`}
              </p>
              {images[lightboxIndex]?.description && (
                <p className="text-sm text-gray-300 mt-1">
                  {images[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyImageGallery;