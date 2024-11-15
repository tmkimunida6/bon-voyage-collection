/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { SetStateAction, useRef, useState } from 'react'
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

  // アラート
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  // 投稿削除
  const confirmDeletePost = async (post_id: string) => {
    onOpen()

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
        onClick={onOpen}
        disabled={isLoading}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              投稿を削除してもよろしいですか？
            </AlertDialogHeader>
            <AlertDialogFooter justifyContent="center" gap={4}>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={() => confirmDeletePost(post.alias_id)}
                isLoading={isLoading}
              >
                削除する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
