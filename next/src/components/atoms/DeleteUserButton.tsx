/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteUserAction } from '@/actions/deleteUserAction'
import { signoutAction } from '@/actions/signoutAction'

type DeleteUserButtonProps = {
  onClose: () => void
}

const DeleteUserButton = ({ onClose }: DeleteUserButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const router = useRouter()

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
    } catch (error: any) {
      toast({
        title: error.message,
        status: error.status,
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button colorScheme="red" onClick={handleDeleteUser} isLoading={isLoading}>
      削除する
    </Button>
  )
}

export default DeleteUserButton
