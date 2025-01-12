/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { confirmUserAction } from '@/actions/confirmUserAction'
import { favoriteBulkAction } from '@/actions/favoriteBulkAction'
import { UserRequestType } from '@/types/types'

type ConfirmationHandlerType = {
  confirmationToken: string
  requestAction: UserRequestType
}

const ConfirmationHandler = ({
  confirmationToken,
  requestAction,
}: ConfirmationHandlerType) => {
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    const confirmationAction = async () => {
      try {
        const result = await confirmUserAction(confirmationToken, requestAction)
        toast({
          title: result.message,
          status: result.status,
          duration: 5000,
          isClosable: true,
        })

        // おすすめのお土産を「欲しい」に一括追加
        const favoritedSouvenirsFromRecommend =
          localStorage.getItem('favoritedSouvenirs')
        if (favoritedSouvenirsFromRecommend) {
          const favoriteResult = await favoriteBulkAction(
            JSON.parse(favoritedSouvenirsFromRecommend),
          )
          toast({
            title: favoriteResult.message,
            status: favoriteResult.status,
            duration: 5000,
            isClosable: true,
          })
        }
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
        if (requestAction === 'registration') {
          router.push('/timeline')
        } else {
          router.push('/mypage')
        }
      }
    }

    confirmationAction()
  }, [toast, confirmationToken])

  return null
}

export default ConfirmationHandler
