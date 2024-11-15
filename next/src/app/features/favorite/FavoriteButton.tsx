/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { Button, IconButton } from '@chakra-ui/react'
import { useEffect } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import useFavorite from '@/hooks/useFavorite'
import { useFavoriteStore } from '@/store/store'
import { SouvenirType } from '@/types/types'

type FavoriteButtonProps = {
  currentSouvenir: SouvenirType
  isIconButton: boolean
}

const FavoriteButton = ({
  currentSouvenir,
  isIconButton,
}: FavoriteButtonProps) => {
  const { favoritedSouvenirs } = useFavoriteStore()
  const {
    handleFavorite,
    isLoading,
    setIsLoading,
    isFavorited,
    setIsFavorited,
  } = useFavorite()

  // 初回レンダリングのみ
  useEffect(() => {
    setIsLoading(false)
  }, [])
  useEffect(() => {
    const isCurrentSouvenirFavorited = favoritedSouvenirs.some(
      (souvenir) => souvenir.alias_id === currentSouvenir.alias_id,
    )
    if (isCurrentSouvenirFavorited) {
      setIsFavorited(true)
    }
  }, [favoritedSouvenirs])

  return (
    <>
      {isIconButton ? (
        <IconButton
          aria-label="Search database"
          icon={
            <CustomIcon
              iconName={isFavorited ? 'FaBookmark' : 'FaRegBookmark'}
              color="brand.primary"
            />
          }
          variant="ghost"
          position="absolute"
          top={2}
          right={2}
          height={6}
          minWidth={6}
          _hover={{ backgroundColor: 'none' }}
          onClick={() => {
            if (!isLoading) {
              if (isFavorited) {
                handleFavorite('DELETE', currentSouvenir)
              } else {
                handleFavorite('POST', currentSouvenir)
              }
            }
          }}
          pointerEvents={isLoading ? 'none' : 'auto'}
        />
      ) : (
        <Button
          variant={isFavorited ? 'secondary' : 'outline'}
          gap={2}
          onClick={() => {
            if (!isLoading) {
              if (isFavorited) {
                handleFavorite('DELETE', currentSouvenir)
              } else {
                handleFavorite('POST', currentSouvenir)
              }
            }
          }}
          pointerEvents={isLoading ? 'none' : 'auto'}
        >
          <CustomIcon iconName={isFavorited ? 'FaBookmark' : 'FaRegBookmark'} />
          {isFavorited ? 'リストから削除' : '欲しい！'}
        </Button>
      )}
    </>
  )
}

export default FavoriteButton
