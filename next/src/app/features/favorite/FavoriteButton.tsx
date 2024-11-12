/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { Box, Button, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { favoriteAction } from '@/actions/favoriteAction'
import CustomIcon from '@/components/atoms/CustomIcon'
import { SouvenirType } from '@/types/types'
import { useFavoriteStore } from '@/store/store'

type FavoriteButtonProps = {
  currentSouvenir: SouvenirType
  iconOnly: boolean
  favoritedSouvenirData: Array<SouvenirType>
}

const FavoriteButton = ({
  currentSouvenir,
  iconOnly,
  favoritedSouvenirData,
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { favoritedSouvenirs, setFavoritedSouvenirs, addFavoritedSouvenir, removeFavoritedSouvenir } = useFavoriteStore()
  const toast = useToast()

  // 初回レンダリングのみ
  useEffect(() => {
    !favoritedSouvenirs.length && setFavoritedSouvenirs(favoritedSouvenirData)
    const souvenirs = favoritedSouvenirs.length ? favoritedSouvenirs : favoritedSouvenirData
    if (souvenirs.some((souvenir) => souvenir.alias_id === currentSouvenir.alias_id)) {
      setIsFavorited(true);
    }
  }, [])

  const handleFavorite = async (method: 'POST' | 'DELETE') => {
    try {
      setIsLoading(true)
      setIsFavorited((prev) => !prev)

      const result = await favoriteAction(currentSouvenir.alias_id, method)

      // グローバルステートに反映
      if (method === 'POST') {
        if (!favoritedSouvenirs.some((souvenir) => souvenir.alias_id === currentSouvenir.alias_id)) {
          addFavoritedSouvenir(currentSouvenir);
        }
      } else if (method === 'DELETE') {
        removeFavoritedSouvenir(currentSouvenir);
      }

      toast({
        title: result.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch(error: any) {
      setIsFavorited((prev) => !prev)
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isFavorited ? (
        <Button
          variant="secondary"
          gap={2}
          onClick={() => handleFavorite('DELETE')}
          pointerEvents={isLoading ? "none" : "auto"}
        >
          <CustomIcon iconName="FaBookmark" />
          リストから削除
        </Button>
      ) : (
        <Button
          variant="outline"
          gap={2}
          onClick={() => handleFavorite('POST')}
          pointerEvents={isLoading ? "none" : "auto"}
        >
          <CustomIcon iconName="FaRegBookmark" />
          欲しい！
        </Button>
      )}
    </>
  )
}

export default FavoriteButton
