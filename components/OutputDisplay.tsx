
import React from 'react';
import { ImageIcon, LoadingSpinnerIcon } from './icons';

interface OutputDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const Placeholder: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-center text-stone-400 p-8">
    <ImageIcon className="w-24 h-24 mb-4" />
    <h3 className="text-xl font-semibold text-stone-600">Your Photoshoot Appears Here</h3>
    <p className="mt-2 max-w-xs">Upload your images and click "Create Photoshoot" to see the magic happen.</p>
  </div>
);

const LoadingState: React.FC = () => (
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
    <LoadingSpinnerIcon className="w-16 h-16 text-amber-500" />
    <p className="mt-4 text-lg font-semibold text-stone-700">Generating 8K Realism...</p>
    <p className="text-stone-500">This may take a moment.</p>
  </div>
);

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ imageUrl, isLoading }) => {
  return (
    <div className="relative aspect-[9/16] lg:aspect-[16/9] w-full bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {isLoading && <LoadingState />}
        {imageUrl ? (
            <img 
                src={imageUrl} 
                alt="Generated Photoshoot" 
                className="w-full h-full object-cover transition-opacity duration-500"
            />
        ) : (
            <Placeholder />
        )}
    </div>
  );
};
