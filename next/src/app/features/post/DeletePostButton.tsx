'use client'

import { deletePostAction } from "@/actions/deletePostAction"
import CustomIcon from "@/components/atoms/CustomIcon"
import { PostType } from "@/types/types"
import { IconButton, useToast } from "@chakra-ui/react"
import { useState } from "react"

type DeletePostButtonProps = {
  post: PostType
}

export default function DeletePostButton({ post }: DeletePostButtonProps) {
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
    } catch(error: any) {
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