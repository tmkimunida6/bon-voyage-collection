/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { useToast } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type ToastMessageType = {
  message: string
  status: 'info' | 'warning' | 'success' | 'error'
}

const toastMessages: Record<string, ToastMessageType> = {
  login_required: { message: 'ログインしてください', status: 'error' },
}

const Toaster = () => {
  const searchParams = useSearchParams()
  const statusQuery = searchParams.get('status')
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!statusQuery) return
    const errorMessage =
      toastMessages[statusQuery as keyof typeof toastMessages] ||
      'エラーが発生しました。'
    toast({
      title: errorMessage.message,
      status: errorMessage.status,
      duration: 5000,
      isClosable: true,
    })

    // URLからエラーコードを削除
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('status')
    router.replace(
      `${window.location.pathname}?${newSearchParams.toString()}`,
      { shallow: true } as any,
    )
  }, [statusQuery, searchParams, router, toast])

  return null
}

export default Toaster
