import React, { useState, useEffect } from 'react';
import { ImageIcon, LoadingSpinnerIcon, DownloadIcon, DiamondIcon } from './icons';

interface OutputDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  aspectRatio: string;
}

const Placeholder: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-center text-stone-400 p-8">
    <ImageIcon className="w-24 h-24 mb-4" />
    <h3 className="text-xl font-semibold text-stone-600">Your Photoshoot Appears Here</h3>
    <p className="mt-2 max-w-xs">Upload your images and click "Create Photoshoot" to see the magic happen.</p>
  </div>
);

const creativeLoadingMessages = [
  'Polishing the gemstones...',
  'Calibrating camera for 8K...',
  'Finding the perfect angle...',
  'Adjusting ambient lighting...',
  'Rendering cinematic bokeh...',
  'Finalizing luxury aesthetic...',
];

const CreativeLoadingState: React.FC = () => {
  const [message, setMessage] = useState(creativeLoadingMessages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % creativeLoadingMessages.length;
      setMessage(creativeLoadingMessages[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4">
      <div className="relative">
        <LoadingSpinnerIcon className="w-16 h-16 text-amber-500" />
        <DiamondIcon className="w-8 h-8 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="mt-4 text-lg font-semibold text-stone-700 text-center transition-opacity duration-500">{message}</p>
      <p className="text-stone-500 text-center">This may take a moment.</p>
    </div>
  );
};


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ imageUrl, isLoading, aspectRatio }) => {
  const cssAspectRatio = aspectRatio.replace(':', ' / ');

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const fileName = `ai_jewelry_photoshoot_${aspectRatio.replace(':', 'x')}.png`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      style={{ aspectRatio: cssAspectRatio }}
      className="relative w-full bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden transition-all duration-300">
        {isLoading && <CreativeLoadingState />}
        {imageUrl ? (
            <>
                <img 
                    src={imageUrl} 
                    alt="Generated Photoshoot" 
                    className="w-full h-full object-cover transition-opacity duration-500"
                />
                <button
                    onClick={handleDownload}
                    title="Download Image"
                    aria-label="Download generated image"
                    className="absolute top-4 right-4 p-2.5 bg-black/40 rounded-full text-white hover:bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
                >
                    <DownloadIcon className="w-5 h-5" />
                </button>
            </>
        ) : (
            <Placeholder />
        )}
    </div>
  );
};