/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { confirmUserAction } from '@/actions/confirmUserAction'

type ToastDataType = {
  confirmationToken: string
}

const ConfirmationHandler = ({ confirmationToken }: ToastDataType) => {
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    const confirmationAction = async () => {
      try {
        const result = await confirmUserAction(confirmationToken)
        toast({
          title: result.message,
          status: result.status,
          duration: 5000,
          isClosable: true,
        })
      } catch (error: any) {
        toast({
          title:
            error.message ||
            'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        router.push('/')
      }
    }

    confirmationAction()
  }, [toast, confirmationToken])

  return null
}

export default ConfirmationHandler
