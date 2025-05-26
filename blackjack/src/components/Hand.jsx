import React from 'react'
import CardWithSkins from './CardWithSkins'
import { useCardSkin } from '../contexts/CardSkinContext'

export default function Hand({cards, title, handValue}) {
  const { selectedSkin, useImages } = useCardSkin();
  
  return (  
    <div className='flex-1 max-w-md mx-auto'>
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-white">
          {title}
        </h2>
        <div className="text-center mb-3">
          <span className="text-lg font-semibold text-yellow-400">
            Valor: {handValue}
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {cards.map((card, index) => (
            <CardWithSkins 
              key={index} 
              card={card} 
              skin={selectedSkin}
              useImages={useImages}
            />
          ))} 
        </div>
      </div>
    </div>
  )
}
