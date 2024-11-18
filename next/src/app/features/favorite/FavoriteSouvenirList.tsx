'use client'

import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { useFavoriteStore } from '@/store/store'
import { SouvenirCardType } from '@/types/types'

const FavoriteSouvenirList = () => {
  const { favoritedSouvenirs } = useFavoriteStore()

  return (
    <SouvenirCardList
      size="md"
      renderItem={(size) => (
        <>
          {favoritedSouvenirs.map((souvenir: SouvenirCardType) => (
            <SouvenirCard
              key={souvenir.alias_id}
              size={size}
              souvenir={souvenir}
              isFavoritable={true}
              rating={souvenir.average_rating || null}
              hasTrashIcon={true}
            />
          ))}
        </>
      )}
    />
  )
}

export default FavoriteSouvenirList
