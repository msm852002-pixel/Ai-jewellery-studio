
import React from 'react';
import { DiamondIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="p-4 sm:p-6">
      <nav className="container mx-auto max-w-7xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <DiamondIcon className="w-8 h-8 text-amber-500" />
          <h1 className="text-xl font-bold text-stone-800 tracking-tight">
            AI Jewelry Photoshoot Studio
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-amber-500 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Projects</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Output Gallery</a>
        </div>
      </nav>
    </header>
  );
};
