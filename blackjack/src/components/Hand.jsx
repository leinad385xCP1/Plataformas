import React from 'react'
import CardWithSkins from './CardWithSkins'
import { useCardSkin } from '../contexts/CardSkinContext'

export default function Hand({cards, title, handValue, isDealer = false}) {
  const { selectedSkin, useImages } = useCardSkin();
  
  return (  
    <div className={`flex flex-col items-center ${isDealer ? 'mb-4' : 'mt-4'}`}>
      {/* Área de cartas con efecto de mesa */}
      <div className={`relative p-6 rounded-2xl ${isDealer ? 'bg-red-900 bg-opacity-30 border-2 border-red-500' : 'bg-blue-900 bg-opacity-30 border-2 border-blue-500'} shadow-2xl backdrop-blur-sm`}>
        {/* Indicador de valor de mano */}
        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full ${isDealer ? 'bg-red-600' : 'bg-blue-600'} border-2 ${isDealer ? 'border-red-400' : 'border-blue-400'} shadow-lg`}>
          <span className="text-sm font-bold text-white">
            {handValue}
          </span>
        </div>
        
        {/* Área de cartas */}
        <div className="flex justify-center items-center gap-2 min-h-32">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <div 
                key={index}
                className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                style={{
                  transform: `rotate(${(index - cards.length/2) * 3}deg)`,
                  zIndex: index
                }}
              >
                <CardWithSkins 
                  card={card} 
                  skin={selectedSkin}
                  useImages={useImages}
                />
              </div>
            ))
          ) : (
            <div className={`w-20 h-28 rounded-lg border-2 border-dashed ${isDealer ? 'border-red-400' : 'border-blue-400'} flex items-center justify-center opacity-50`}>
              <span className="text-4xl">🃏</span>
            </div>
          )}
        </div>
        
        {/* Chip decorativo para mostrar el valor */}
        <div className={`absolute -bottom-3 right-2 w-8 h-8 rounded-full ${isDealer ? 'bg-red-500' : 'bg-blue-500'} border-2 border-white shadow-lg flex items-center justify-center`}>
          <span className="text-xs font-bold text-white">{cards.length}</span>
        </div>
      </div>
    </div>
  )
}
