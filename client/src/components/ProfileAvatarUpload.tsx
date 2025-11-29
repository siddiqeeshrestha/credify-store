import React, { useState, useRef } from 'react';
import { Camera, User as UserIcon } from 'lucide-react';

interface ProfileAvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (avatarUrl: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileAvatarUpload: React.FC<ProfileAvatarUploadProps> = ({
  currentAvatar,
  onAvatarChange,
  className = '',
  size = 'lg'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentAvatar || '');
  const [imageError, setImageError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  const iconSizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const cameraSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  // Set initial preview only if currentAvatar is valid
  React.useEffect(() => {
    if (currentAvatar && currentAvatar.trim() && !currentAvatar.includes('undefined')) {
      setPreview(currentAvatar);
      setImageError(false);
    } else {
      setPreview('/figmaAssets/profile.png'); // Default avatar
      setImageError(false);
    }
  }, [currentAvatar]);

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

    try {
      // Convert file to base64 for upload
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        try {
          // Upload to server
          const response = await fetch('/api/upload/avatar', {
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
            const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
            throw new Error(`Upload failed: ${errorData.message || response.statusText}`);
          }

          const result = await response.json();
          
          // Set preview and notify parent
          setPreview(base64Data);
          setImageError(false);
          onAvatarChange(result.imageUrl);
        } catch (error) {
          console.error('Upload failed:', error);
          alert('Failed to upload avatar. Please try again.');
        } finally {
          setIsUploading(false);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`${sizeClasses[size]} relative rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg cursor-pointer group`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {preview && !imageError ? (
          <img
            src={preview}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
            onError={() => {
              setImageError(true);
              setPreview('/figmaAssets/profile.png');
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <UserIcon className={`${iconSizeClasses[size]} text-gray-400`} />
          </div>
        )}
        
        {/* Upload overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto"></div>
            ) : (
              <>
                <Camera className={`${cameraSizeClasses[size]} mx-auto mb-1`} />
                <span className="text-xs font-medium">Change</span>
              </>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </div>
      
      <div className="absolute -bottom-2 -right-2 bg-[#98042d] rounded-full p-2 shadow-lg cursor-pointer"
           onClick={() => !isUploading && fileInputRef.current?.click()}>
        <Camera className={`${cameraSizeClasses[size]} text-white`} />
      </div>
    </div>
  );
};