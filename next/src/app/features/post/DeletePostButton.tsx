/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { IconButton, useToast } from '@chakra-ui/react'
import { SetStateAction, useState } from 'react'
import { deletePostAction } from '@/actions/deletePostAction'
import CustomIcon from '@/components/atoms/CustomIcon'
import { PostType, timelineResultType } from '@/types/types'

type DeletePostButtonProps = {
  post: PostType
  setTimelineResult: (state: SetStateAction<timelineResultType>) => void
}

export default function DeletePostButton({
  post,
  setTimelineResult,
}: DeletePostButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()

  const handleDeletePost = async (post_id: string) => {
    try {
      setIsLoading(true)
      const result = await deletePostAction(post_id)
      toast({
        title: result.message,
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: error.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
      setTimelineResult((prevResult) => ({
        posts: prevResult.posts.filter(
          (post: PostType) => post.alias_id !== post_id,
        ),
        pages: prevResult.pages,
      }))
    }
  }

  return (
    <IconButton
      aria-label="「欲しい！」から削除"
      icon={<CustomIcon iconName="FaTrashAlt" />}
      position="absolute"
      top={2}
      right={2}
      height={6}
      minWidth={6}
      colorScheme="red"
      onClick={() => handleDeletePost(post.alias_id)}
      disabled={isLoading}
    />
  )
}
