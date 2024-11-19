/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { IconButton } from '@chakra-ui/react'
import { useEffect } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import useFavorite from '@/hooks/useFavorite'
import { SouvenirCardType } from '@/types/types'

type FavoriteTrashButtonProps = {
  currentSouvenir: SouvenirCardType
}

const FavoriteTrashButton = ({ currentSouvenir }: FavoriteTrashButtonProps) => {
  const { handleFavorite, isLoading, setIsLoading } = useFavorite()

  // 初回レンダリングのみ
  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <IconButton
        aria-label="「欲しい！」から削除"
        icon={<CustomIcon iconName="FaTrashAlt" />}
        position="absolute"
        top={2}
        right={2}
        height={6}
        minWidth={6}
        colorScheme="red"
        onClick={() => handleFavorite('DELETE', currentSouvenir)}
        pointerEvents={isLoading ? 'none' : 'auto'}
      />
    </>
  )
}

export default FavoriteTrashButton
