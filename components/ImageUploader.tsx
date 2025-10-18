
import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  title: string;
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
  placeholderText: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onFileSelect, previewUrl, placeholderText }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-stone-700">{title}</h2>
      <div
        onClick={handleAreaClick}
        className="relative aspect-square w-full bg-white rounded-2xl shadow-md border-2 border-dashed border-stone-200 hover:border-amber-400 transition-all duration-300 cursor-pointer overflow-hidden group"
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white opacity-0 group-hover:opacity-100 font-semibold">Change Photo</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-stone-400">
            <UploadIcon className="w-12 h-12 mb-2" />
            <p className="font-medium">Click to upload</p>
            <p className="text-sm">{placeholderText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
