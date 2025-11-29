import React, { useState } from 'react';
import { PhotoIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ImageGalleryProps {
  onImageSelect: (imageUrl: string) => void;
  selectedImage?: string;
  className?: string;
}

// Available images from the figma assets
const availableImages = [
  { name: 'Electronics', url: '/figmaAssets/product.png', category: 'products' },
  { name: 'Fashion', url: '/figmaAssets/image.png', category: 'clothing' },
  { name: 'Books', url: '/figmaAssets/image-1.png', category: 'books' },
  { name: 'Home & Garden', url: '/figmaAssets/image-4.png', category: 'home' },
  { name: 'Sports', url: '/figmaAssets/image-5.png', category: 'sports' },
  { name: 'Beauty', url: '/figmaAssets/image-20.png', category: 'beauty' },
  { name: 'Product Frame', url: '/figmaAssets/frame.png', category: 'products' },
  { name: 'Banner', url: '/figmaAssets/banner.png', category: 'banners' },
  { name: 'Profile', url: '/figmaAssets/profile.png', category: 'users' },
  { name: 'Cart', url: '/figmaAssets/cart.png', category: 'interface' },
  { name: 'Logo', url: '/figmaAssets/logo.png', category: 'branding' },
  { name: 'Background', url: '/figmaAssets/background.png', category: 'backgrounds' },
];

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  onImageSelect,
  selectedImage,
  className = ''
}) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'products', 'clothing', 'books', 'home', 'sports', 'beauty', 'banners', 'interface', 'branding', 'backgrounds'];
  
  const filteredImages = filter === 'all' 
    ? availableImages 
    : availableImages.filter(img => img.category === filter);

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose from Available Images
        </label>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === cat
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Image Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
          {filteredImages.map((image) => (
            <div
              key={image.url}
              className={`relative cursor-pointer rounded-lg border-2 transition-colors ${
                selectedImage === image.url
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onImageSelect(image.url)}
            >
              <div className="aspect-square p-1">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                          <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
              
              {selectedImage === image.url && (
                <div className="absolute -top-1 -right-1 bg-indigo-500 rounded-full p-1">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 rounded-b truncate">
                {image.name}
              </div>
            </div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No images found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};