/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { Button, IconButton } from '@chakra-ui/react'
import { useEffect } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import useFavorite from '@/hooks/useFavorite'
import { useFavoriteStore } from '@/store/index'
import { SouvenirCardType } from '@/types/types'

type FavoriteButtonProps = {
  currentSouvenir: SouvenirCardType
  isIconButton: boolean
  position: 'static' | 'absolute'
}

const FavoriteButton = ({
  currentSouvenir,
  isIconButton,
  position,
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
    setIsFavorited(isCurrentSouvenirFavorited)
  }, [favoritedSouvenirs])

  const positionStyles = {
    static: {
      position: 'static',
      width: 'auto',
      height: 'auto',
      minWidth: 0,
    },
    absolute: {
      position: 'absolute',
      top: 2,
      right: 2,
      minWidth: 6,
    },
  }

  return (
    <>
      {isIconButton ? (
        <IconButton
          aria-label={
            isFavorited ? '「欲しい！」から削除する' : '「欲しい！」に登録する'
          }
          icon={
            <CustomIcon
              iconName={isFavorited ? 'FaBookmark' : 'FaRegBookmark'}
              color="brand.primary"
            />
          }
          variant="ghost"
          sx={{ ...positionStyles[position] }}
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
          variant={isFavorited ? 'solid' : 'outline'}
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
