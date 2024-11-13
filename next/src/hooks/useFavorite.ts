/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { favoriteAction } from '@/actions/favoriteAction'
import { useFavoriteStore } from '@/store/store'
import { SouvenirType } from '@/types/types'

type UseFavoriteHook = {
  handleFavorite: (
    method: 'POST' | 'DELETE',
    currentSouvenir: SouvenirType,
  ) => Promise<void>
  isLoading: boolean
  setIsLoading: (state: boolean) => void
  isFavorited: boolean
  setIsFavorited: (state: boolean) => void
}

const useFavorite = (): UseFavoriteHook => {
  const {
    favoritedSouvenirs,
    setFavoritedSouvenirs,
    addFavoritedSouvenir,
    removeFavoritedSouvenir,
  } = useFavoriteStore()

  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const toast = useToast()

  const handleFavorite = async (
    method: 'POST' | 'DELETE',
    currentSouvenir: SouvenirType,
  ) => {
    const originalState = [...favoritedSouvenirs]
    try {
      setIsLoading(true)
      setIsFavorited((prev) => !prev)
      if (method === 'POST') {
        if (
          !favoritedSouvenirs.some(
            (souvenir) => souvenir.alias_id === currentSouvenir.alias_id,
          )
        ) {
          addFavoritedSouvenir(currentSouvenir)
        }
      } else if (method === 'DELETE') {
        removeFavoritedSouvenir(currentSouvenir)
      }

      const result = await favoriteAction(currentSouvenir.alias_id, method)

      toast({
        title: result.message,
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    } catch (error: any) {
      setIsFavorited((prev) => !prev)
      setFavoritedSouvenirs(originalState)
      toast({
        title: error.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleFavorite,
    isLoading,
    setIsLoading,
    isFavorited,
    setIsFavorited,
  }
}

export default useFavorite
