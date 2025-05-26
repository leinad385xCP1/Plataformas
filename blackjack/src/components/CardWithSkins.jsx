import React from 'react';

// Mapeo de palos para compatibilidad
const suitMapping = {
  '♠': 'spades',
  '♥': 'hearts', 
  '♦': 'diamonds',
  '♣': 'clubs'
};

// Símbolos de los palos
const suitSymbols = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣'
};

// Diferentes skins de cartas
const cardSkins = {
  classic: {
    name: 'Clásico',
    cardClass: 'bg-white border-2 border-gray-800 rounded-lg shadow-xl card-shadow',
    valueClass: 'font-bold text-lg',
    suitClass: 'text-xl',
    backClass: 'bg-blue-800 border-2 border-blue-900'
  },
  neon: {
    name: 'Neón',
    cardClass: 'bg-black border-2 border-cyan-400 rounded-lg shadow-xl shadow-cyan-400/50',
    valueClass: 'font-bold text-lg text-cyan-400 drop-shadow-lg casino-glow',
    suitClass: 'text-xl text-pink-400 drop-shadow-lg casino-glow',
    backClass: 'bg-purple-900 border-2 border-pink-400 shadow-lg shadow-pink-400/50'
  },
  royal: {
    name: 'Real',
    cardClass: 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 border-2 border-yellow-600 rounded-lg shadow-xl card-shadow',
    valueClass: 'font-serif font-bold text-lg text-yellow-800',
    suitClass: 'text-xl text-yellow-700',
    backClass: 'bg-gradient-to-br from-purple-800 to-purple-900 border-2 border-gold-400'
  },
  minimal: {
    name: 'Minimalista',
    cardClass: 'bg-gray-50 border border-gray-300 rounded-md shadow-lg',
    valueClass: 'font-light text-lg text-gray-700',
    suitClass: 'text-xl text-gray-600',
    backClass: 'bg-gray-400 border border-gray-500'
  },
  retro: {
    name: 'Retro',
    cardClass: 'bg-amber-50 border-4 border-amber-800 rounded-none shadow-xl',
    valueClass: 'font-mono font-bold text-lg text-amber-900',
    suitClass: 'text-xl text-amber-800',
    backClass: 'bg-amber-900 border-4 border-amber-700'
  },
  images: {
    name: 'Imágenes',
    cardClass: 'bg-white border-2 border-gray-800 rounded-lg shadow-lg',
    valueClass: 'font-bold text-lg',
    suitClass: 'text-xl',
    backClass: 'bg-blue-800 border-2 border-blue-900'
  }
};

export default function Card({ card, isBack = false, skin = 'classic', useImages = false }) {
  // Si se especifica usar imágenes o el skin es 'images', usar el sistema de imágenes original
  if (useImages || skin === 'images') {
    const cardImage = `/card-images/${card.rank}_of_${card.suit}.png`;
    
    return (
      <div className="w-24 h-32 bg-white border-2 border-gray-800 rounded-lg shadow-xl card-shadow hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <img 
          src={cardImage} 
          alt={`${card.rank}_of_${card.suit}`} 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>
    );
  }

  const skinStyle = cardSkins[skin] || cardSkins.classic;
  
  // Si es el reverso de la carta
  if (isBack) {
    return (
      <div className={`w-24 h-32 ${skinStyle.backClass} rounded-lg flex items-center justify-center relative overflow-hidden hover:scale-105 transition-all duration-300`}>
        <div className="absolute inset-2 border border-opacity-30 border-white rounded"></div>
        <div className="text-white text-xs opacity-50 font-bold">BJ</div>
        {/* Patrón decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>
    );
  }

  // Convertir palo a formato string si es necesario
  const suitKey = suitMapping[card.suit] || card.suit;
  const suitSymbol = suitSymbols[suitKey] || card.suit;
  
  // Determinar color de la carta
  const isRed = suitKey === 'hearts' || suitKey === 'diamonds';
  const textColor = isRed ? 'text-red-600' : 'text-black';
  
  return (
    <div className={`w-24 h-32 ${skinStyle.cardClass} p-2 flex flex-col justify-between relative hover:scale-105 transition-all duration-300 deal-animation`}>
      {/* Valor y palo en la esquina superior izquierda */}
      <div className="flex flex-col items-center">
        <span className={`${skinStyle.valueClass} ${textColor} leading-none`}>
          {card.rank}
        </span>
        <span className={`${skinStyle.suitClass} ${textColor} leading-none`}>
          {suitSymbol}
        </span>
      </div>
      
      {/* Símbolo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-4xl ${textColor} opacity-20`}>
          {suitSymbol}
        </span>
      </div>
      
      {/* Valor y palo en la esquina inferior derecha (invertido) */}
      <div className="flex flex-col items-center rotate-180 self-end">
        <span className={`${skinStyle.valueClass} ${textColor} leading-none text-sm`}>
          {card.rank}
        </span>
        <span className={`${skinStyle.suitClass} ${textColor} leading-none text-lg`}>
          {suitSymbol}
        </span>
      </div>
    </div>
  );
}
