'use client'

import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { useFavoriteStore } from '@/store/store'
import { SouvenirType } from '@/types/types'

const FavoriteSouvenirList = () => {
  const { favoritedSouvenirs } = useFavoriteStore()

  return (
    <SouvenirCardList
      size="md"
      renderItem={(size) => (
        <>
          {favoritedSouvenirs.map((souvenir: SouvenirType) => (
            <SouvenirCard
              key={souvenir.alias_id}
              size={size}
              souvenir={souvenir}
              isFavoritable={true}
              rating={'2'}
              hasTrashIcon={true}
            />
          ))}
        </>
      )}
    />
  )
}

export default FavoriteSouvenirList
