
import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { OutputDisplay } from './components/OutputDisplay';
import { generatePhotoshootImage } from './services/geminiService';
import { MagicWandIcon } from './components/icons';
import { AspectRatioSelector, AspectRatio } from './components/AspectRatioSelector';

const aspectRatios: AspectRatio[] = [
  { name: 'Square', ratio: '1:1', dimensions: '1080x1080px' },
  { name: 'Portrait', ratio: '4:5', dimensions: '1080x1350px' },
  { name: 'Landscape', ratio: '1.91:1', dimensions: '1080x566px' },
  { name: 'Story / Reel', ratio: '9:16', dimensions: '1080x1920px' },
  { name: '2K Landscape', ratio: '4:3', dimensions: '2048x1556px' },
  { name: '2K Portrait', ratio: '3:4', dimensions: '1556x2048px' },
  { name: '4K Landscape', ratio: '16:9', dimensions: '3840x2160px' },
  { name: '4K Portrait', ratio: '9:16', dimensions: '2160x3840px' },
];


const App: React.FC = () => {
  const [jewelryFile, setJewelryFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');

  const jewelryPreviewUrl = useMemo(() => {
    return jewelryFile ? URL.createObjectURL(jewelryFile) : null;
  }, [jewelryFile]);

  const modelPreviewUrl = useMemo(() => {
    return modelFile ? URL.createObjectURL(modelFile) : null;
  }, [modelFile]);

  useEffect(() => {
    return () => {
      if (jewelryPreviewUrl) URL.revokeObjectURL(jewelryPreviewUrl);
      if (modelPreviewUrl) URL.revokeObjectURL(modelPreviewUrl);
    };
  }, [jewelryPreviewUrl, modelPreviewUrl]);

  const handleGenerateClick = async () => {
    if (!jewelryFile || !modelFile) {
      setError('Please upload both a jewelry and a model photo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputImage(null);

    try {
      const generatedImageBase64 = await generatePhotoshootImage(jewelryFile, modelFile, aspectRatio);
      setOutputImage(`data:image/png;base64,${generatedImageBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !jewelryFile || !modelFile || isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-white">
      <Header />
      <main className="p-4 sm:p-6 md:p-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Inputs */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ImageUploader
                  title="Upload Jewelry"
                  onFileSelect={setJewelryFile}
                  previewUrl={jewelryPreviewUrl}
                  placeholderText="An earring or necklace"
                />
                <ImageUploader
                  title="Upload Model Photo"
                  onFileSelect={setModelFile}
                  previewUrl={modelPreviewUrl}
                  placeholderText="A model portrait"
                />
              </div>
               <AspectRatioSelector
                options={aspectRatios}
                selectedRatio={aspectRatio}
                onSelect={setAspectRatio}
              />
              <button
                onClick={handleGenerateClick}
                disabled={isButtonDisabled}
                className="w-full flex items-center justify-center gap-3 text-lg font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <MagicWandIcon className="w-6 h-6" />
                {isLoading ? 'Generating Photoshoot...' : 'Create Photoshoot'}
              </button>
              {error && <p className="text-center text-red-500 mt-2">{error}</p>}
            </div>

            {/* Right Column: Output */}
            <div className="lg:w-1/2">
              <OutputDisplay
                imageUrl={outputImage}
                isLoading={isLoading}
                aspectRatio={aspectRatio}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
