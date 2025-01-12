'use client'

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
  Flex,
  AlertDialogBody,
  useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { deleteUserAction } from '@/actions/deleteUserAction'
import { signoutAction } from '@/actions/signoutAction'
import CustomIcon from '@/components/atoms/CustomIcon'
import { redirect, useRouter } from 'next/navigation'

const DeleteUserModalWithButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()

  // アラート
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  // ユーザー削除
  const handleDeleteUser = async () => {
    try {
      setIsLoading(true)
      const result = await deleteUserAction()
      toast({
        title: result.message,
        status: result.status,
        duration: 5000,
        isClosable: true,
      })

      if (result.status === 'success') {
        await signoutAction()
        router.push('/sign_in')
      } else {
        onClose()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Flex>
        <Button
          variant="ghost"
          fontSize="md"
          fontWeight="normal"
          textDecoration="none"
          py={4}
          px={0}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
          w="100%"
          h="auto"
          transition="all 0.3s"
          _hover={{ color: 'brand.link' }}
          onClick={onOpen}
        >
          <CustomIcon iconName="FaTrash" />
          アカウント削除
        </Button>
      </Flex>
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
            <AlertDialogBody>
              <Text fontSize="md">
                アカウント削除を行うと、アップロードされた写真や投稿を含む全てのデータが削除されます。
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter justifyContent="center" gap={4}>
              <Button
                colorScheme="red"
                onClick={handleDeleteUser}
                isLoading={isLoading}
              >
                削除する
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteUserModalWithButton
