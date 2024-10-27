/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { Spinner, useToast, VStack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { confirmUserAction } from '@/actions/confirmUserAction'

const Confirmation: NextPage = () => {
  const toast = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const confirmationToken = searchParams.get('confirmation_token')

  useEffect(() => {
    const confirmUser = async () => {
      const result = await confirmUserAction(confirmationToken)
      toast({
        title: result.message,
        status: result.status,
        duration: 5000,
        isClosable: true,
      })
      router.push('/')
    }
    confirmUser()
  }, [])

  return (
    <>
      <VStack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        spacing={4}
      >
        <Spinner size="xl" speed="0.5s" thickness="4px" />
        <Text fontWeight="bold">ユーザー認証中です</Text>
      </VStack>
    </>
  )
}

export default Confirmation
