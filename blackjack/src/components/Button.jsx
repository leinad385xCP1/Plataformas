import React from 'react';

export default function Button({ onClick, bg_color, children }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-${bg_color}-600 text-white font-medium px-4 rounded-lg shadow-md mr-2`}
    >
      {children}
    </button>
  );
}
