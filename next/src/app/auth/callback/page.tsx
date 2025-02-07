/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { Spinner, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCallbackPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const parentWindow = window.opener
    if (!parentWindow) {
      window.close()
      return
    }

    const status = searchParams.get('status')
    if (status === 'failure') {
      parentWindow.postMessage({ status: 'error' }, window.location.origin)
      window.close()
      return
    }

    const accessToken = searchParams.get('accessToken')
    const uid = searchParams.get('uid')
    const expiry = searchParams.get('expiry')
    const client = searchParams.get('client')

    if (accessToken && uid && expiry && client) {
      parentWindow.postMessage(
        { accessToken, uid, expiry, client },
        window.location.origin,
      )
      window.close()
    }
  }, [])

  return (
    <VStack
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      spacing={4}
    >
      <Spinner size="xl" speed="0.5s" thickness="4px" />
    </VStack>
  )
}
