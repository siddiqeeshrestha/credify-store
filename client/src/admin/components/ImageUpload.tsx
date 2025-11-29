import React, { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  className = '',
  label = 'Upload Image'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [imageError, setImageError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial preview only if currentImage is valid
  React.useEffect(() => {
    if (currentImage && currentImage.trim() && !currentImage.includes('undefined')) {
      setPreview(currentImage);
      setImageError(false);
    } else {
      setPreview('');
      setImageError(false);
    }
  }, [currentImage]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setImageError(false);

    try {
      // Convert file to base64 for preview
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        // Set preview immediately
        setPreview(base64Data);
        
        try {
          console.log('Uploading image:', file.name);
          
          // Upload to server
          const response = await fetch('/api/admin/upload', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageData: base64Data,
              filename: file.name
            })
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Upload response:', response.status, errorText);
            
            let errorData;
            try {
              errorData = JSON.parse(errorText);
            } catch {
              errorData = { message: errorText || 'Upload failed' };
            }
            
            throw new Error(`Upload failed: ${errorData.message || response.statusText}`);
          }

          const result = await response.json();
          console.log('Upload result:', result);
          
          // Update with server URL
          setImageError(false);
          onImageChange(result.imageUrl);
        } catch (error) {
          console.error('Upload failed:', error);
          setImageError(true);
          alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
          // Reset preview on error
          setPreview('');
          onImageChange('');
        } finally {
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        console.error('Error reading file');
        setIsUploading(false);
        setImageError(true);
        alert('Error reading file. Please try again.');
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
      setIsUploading(false);
      setImageError(true);
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* File Upload Button */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <PhotoIcon className="h-4 w-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Choose File'}
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="inline-flex items-center px-2 py-1 border border-red-300 shadow-sm text-xs leading-4 font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <XMarkIcon className="h-3 w-3 mr-1" />
            Remove
          </button>
        )}
      </div>

      {/* Upload Instructions */}
      <p className="text-xs text-gray-500">
        Supported formats: JPEG, PNG, GIF. Maximum size: 5MB.
      </p>

      {/* Image Preview */}
      {preview && !imageError && (
        <div className="mt-3">
          <label className="block text-xs text-gray-500 mb-2">Preview:</label>
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-lg border border-gray-300"
              onError={() => {
                setImageError(true);
                if (!preview.startsWith('data:')) {
                  setPreview('');
                }
              }}
            />
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {imageError && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">Unable to load image. Please upload a new one.</p>
        </div>
      )}
    </div>
  );
};