'use client'

import { SimpleGrid } from '@chakra-ui/react'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import { useFavoriteStore } from '@/store/store'
import { SouvenirType } from '@/types/types'

const FavoriteSouvenirList = () => {
  const { favoritedSouvenirs } = useFavoriteStore()

  return (
    <SimpleGrid
      templateColumns="repeat(auto-fill, minmax(115px, 1fr))"
      spacingX={2}
      spacingY={4}
    >
      {favoritedSouvenirs.map((souvenir: SouvenirType) => (
        <SouvenirCard
          key={souvenir.alias_id}
          size="sm"
          souvenir={souvenir}
          isFavoritable={true}
          rating={'2'}
          hasTrashIcon={true}
        />
      ))}
    </SimpleGrid>
  )
}

export default FavoriteSouvenirList
