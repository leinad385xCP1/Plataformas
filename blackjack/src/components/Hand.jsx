import React from 'react'
import CardWithSkins from './CardWithSkins'
import { useCardSkin } from '../contexts/CardSkinContext'

export default function Hand({cards, title, handValue}) {
  const { selectedSkin, useImages } = useCardSkin();
  
  return (  
    <div className='p-4'>
      <h2 className="text-2xl mb-2">
        {title}: {handValue}
      </h2>
      <div className="flex flex-col sm:flex-row gap-1">
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
  )
}
