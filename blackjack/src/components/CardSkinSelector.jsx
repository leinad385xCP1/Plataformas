import { useState } from 'react';

const CardSkinSelector = ({ onSkinChange, currentSkin = 'classic' }) => {
  const [selectedSkin, setSelectedSkin] = useState(currentSkin);
  
  // Datos de ejemplo de cartas
  const sampleCards = [
    { suit: 'hearts', rank: 'A', color: 'red' },
    { suit: 'spades', rank: 'K', color: 'black' },
    { suit: 'diamonds', rank: 'Q', color: 'red' },
  ];

  // Símbolos de los palos
  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };

  // Diferentes skins de cartas
  const cardSkins = {
    classic: {
      name: 'Clásico',
      cardClass: 'bg-white border-2 border-gray-800 rounded-lg shadow-lg',
      valueClass: 'font-bold text-lg',
      suitClass: 'text-xl',
      backClass: 'bg-blue-800 border-2 border-blue-900'
    },
    neon: {
      name: 'Neón',
      cardClass: 'bg-black border-2 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/50',
      valueClass: 'font-bold text-lg text-cyan-400 drop-shadow-lg',
      suitClass: 'text-xl text-pink-400 drop-shadow-lg',
      backClass: 'bg-purple-900 border-2 border-pink-400 shadow-lg shadow-pink-400/50'
    },
    royal: {
      name: 'Real',
      cardClass: 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-600 rounded-lg shadow-xl',
      valueClass: 'font-serif font-bold text-lg text-yellow-800',
      suitClass: 'text-xl text-yellow-700',
      backClass: 'bg-gradient-to-br from-purple-800 to-purple-900 border-2 border-gold-400'
    },
    minimal: {
      name: 'Minimalista',
      cardClass: 'bg-gray-50 border border-gray-300 rounded-md shadow-sm',
      valueClass: 'font-light text-lg text-gray-700',
      suitClass: 'text-xl text-gray-600',
      backClass: 'bg-gray-400 border border-gray-500'
    },
    retro: {
      name: 'Retro',
      cardClass: 'bg-amber-50 border-4 border-amber-800 rounded-none shadow-lg',
      valueClass: 'font-mono font-bold text-lg text-amber-900',
      suitClass: 'text-xl text-amber-800',
      backClass: 'bg-amber-900 border-4 border-amber-700'
    },
    images: {
      name: 'Imágenes Reales',
      cardClass: 'bg-white border-2 border-gray-800 rounded-lg shadow-lg',
      valueClass: 'font-bold text-lg',
      suitClass: 'text-xl',
      backClass: 'bg-blue-800 border-2 border-blue-900'
    }
  };

  const PreviewCard = ({ card, skin }) => {
    const skinStyle = cardSkins[skin];
    
    // Si es el skin de imágenes, mostrar una vista especial
    if (skin === 'images') {
      return (
        <div className="w-16 h-20 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-gray-600 text-xs text-center">
            <div>🃏</div>
            <div>IMG</div>
          </div>
        </div>
      );
    }
    
    const textColor = card.color === 'red' ? 'text-red-600' : 'text-black';
    
    return (
      <div className={`w-16 h-20 ${skinStyle.cardClass} p-1 flex flex-col justify-between relative`}>
        {/* Valor y palo en la esquina superior izquierda */}
        <div className="flex flex-col items-center">
          <span className={`${skinStyle.valueClass} ${textColor} leading-none text-sm`}>
            {card.rank}
          </span>
          <span className={`${skinStyle.suitClass} ${textColor} leading-none text-sm`}>
            {suitSymbols[card.suit]}
          </span>
        </div>
        
        {/* Símbolo central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl ${textColor} opacity-20`}>
            {suitSymbols[card.suit]}
          </span>
        </div>
        
        {/* Valor y palo en la esquina inferior derecha (invertido) */}
        <div className="flex flex-col items-center rotate-180 self-end">
          <span className={`${skinStyle.valueClass} ${textColor} leading-none text-xs`}>
            {card.rank}
          </span>
          <span className={`${skinStyle.suitClass} ${textColor} leading-none text-sm`}>
            {suitSymbols[card.suit]}
          </span>
        </div>
      </div>
    );
  };

  const handleSkinChange = (skinKey) => {
    setSelectedSkin(skinKey);
    onSkinChange(skinKey, cardSkins[skinKey]);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white text-lg font-bold mb-4">Selecciona el estilo de cartas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(cardSkins).map(([skinKey, skin]) => (
          <div
            key={skinKey}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              selectedSkin === skinKey 
                ? 'bg-blue-600 ring-2 ring-blue-400' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => handleSkinChange(skinKey)}
          >
            <h4 className="text-white font-semibold mb-2 text-center">{skin.name}</h4>
            
            {/* Vista previa de cartas */}
            <div className="flex justify-center gap-1 mb-2">
              {sampleCards.slice(0, 3).map((card, index) => (
                <PreviewCard key={index} card={card} skin={skinKey} />
              ))}
            </div>
            
            {selectedSkin === skinKey && (
              <div className="text-center">
                <span className="text-green-400 text-sm">✓ Seleccionado</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSkinSelector;
