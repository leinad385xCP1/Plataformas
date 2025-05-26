import React from 'react';

export default function Button({ onClick, bg_color, children }) {
  const getButtonStyles = () => {
    const baseStyles = "relative px-6 py-3 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 border-2";
    
    switch(bg_color) {
      case 'green':
        return `${baseStyles} bg-gradient-to-br from-green-500 to-green-700 border-green-400 hover:from-green-400 hover:to-green-600 shadow-green-500/50`;
      case 'red':
        return `${baseStyles} bg-gradient-to-br from-red-500 to-red-700 border-red-400 hover:from-red-400 hover:to-red-600 shadow-red-500/50`;
      case 'blue':
        return `${baseStyles} bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400 hover:from-blue-400 hover:to-blue-600 shadow-blue-500/50`;
      case 'purple':
        return `${baseStyles} bg-gradient-to-br from-purple-500 to-purple-700 border-purple-400 hover:from-purple-400 hover:to-purple-600 shadow-purple-500/50`;
      default:
        return `${baseStyles} bg-gradient-to-br from-gray-500 to-gray-700 border-gray-400 hover:from-gray-400 hover:to-gray-600 shadow-gray-500/50`;
    }
  };

  return (
    <button 
      onClick={onClick}
      className={getButtonStyles()}
    >
      <span className="relative z-10">{children}</span>
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-0 hover:opacity-20 rounded-xl transition-opacity duration-200"></div>
    </button>
  );
}
