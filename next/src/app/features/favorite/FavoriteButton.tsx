'use client'

import { Button, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { favoriteAction } from '@/actions/favoriteAction'
import CustomIcon from '@/components/atoms/CustomIcon'
import { fetchFavoritedStatus } from '@/utils/fetchFavoritedStatus'

type FavoriteButtonProps = {
  souvenir_id: string
  iconOnly: boolean
  favorited: boolean
}

const FavoriteButton = ({
  souvenir_id,
  iconOnly,
  favorited,
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      let status
      try {
        setIsLoading(true)
        status = await fetchFavoritedStatus(souvenir_id)
      } catch {
        toast({
          title: '情報の取得に失敗しました。',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setIsFavorited(status.favorited)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [souvenir_id])

  const handleAddFavorite = async (method: 'POST' | 'DELETE') => {
    try {
      setIsLoading(true)
      const result = await favoriteAction(souvenir_id, method)
      toast({
        title: result.message,
        status: result.status,
        duration: 5000,
        isClosable: true,
      })
    } catch {
      toast({
        title: '情報の取得に失敗しました。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsFavorited((prev) => !prev)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isFavorited ? (
        <Button
          variant="secondary"
          gap={2}
          onClick={() => handleAddFavorite('DELETE')}
          isLoading={isLoading}
        >
          <CustomIcon iconName="FaBookmark" />
          「欲しい！」から削除
        </Button>
      ) : (
        <Button
          variant="outline"
          gap={2}
          onClick={() => handleAddFavorite('POST')}
          isLoading={isLoading}
        >
          <CustomIcon iconName="FaRegBookmark" />
          欲しい！
        </Button>
      )}
    </>
  )
}

export default FavoriteButton
