/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { Button, IconButton, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { favoriteAction } from '@/actions/favoriteAction'
import CustomIcon from '@/components/atoms/CustomIcon'
import { SouvenirType } from '@/types/types'
import { useFavoriteStore } from '@/store/store'

type FavoriteButtonProps = {
  currentSouvenir: SouvenirType
  isIconButton: boolean
}

const FavoriteButton = ({
  currentSouvenir,
  isIconButton,
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { favoritedSouvenirs, addFavoritedSouvenir, removeFavoritedSouvenir } = useFavoriteStore()
  const toast = useToast()

  // 初回レンダリングのみ
  useEffect(() => {
    if (favoritedSouvenirs.some((souvenir) => souvenir.alias_id === currentSouvenir.alias_id)) {
      setIsFavorited(true);
    }
    setIsLoading(false)
  }, [favoritedSouvenirs])

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
      {isIconButton ? (
        <IconButton
          aria-label="Search database"
          icon={<CustomIcon iconName={isFavorited ? "FaBookmark" : "FaRegBookmark"} color="brand.primary" />}
          variant="ghost"
          position="absolute"
          top={2}
          right={2}
          height={6}
          minWidth={6}
          _hover={{ backgroundColor: 'none' }}
          onClick={() => isFavorited ? handleFavorite('DELETE') : handleFavorite('POST')}
          pointerEvents={isLoading ? "none" : "auto"}
        />
      ) : (
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
      )}
    </>
  )
}

export default FavoriteButton
