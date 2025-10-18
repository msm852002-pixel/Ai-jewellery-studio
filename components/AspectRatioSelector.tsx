import React from 'react';

export interface AspectRatio {
  name: string;
  ratio: string;
  dimensions: string;
}

interface AspectRatioSelectorProps {
  options: AspectRatio[];
  selectedRatio: string;
  onSelect: (ratio: string) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ options, selectedRatio, onSelect }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-stone-700">Select Aspect Ratio</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => onSelect(option.ratio)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedRatio === option.ratio
                ? 'bg-amber-100 border-amber-500 shadow-sm'
                : 'bg-white border-stone-200 hover:border-amber-400'
            }`}
          >
            <p className="font-semibold text-sm text-stone-800">{option.name}</p>
            <p className="text-xs text-stone-500">{option.ratio}</p>
            <p className="text-xs text-stone-400 mt-1">{option.dimensions}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
