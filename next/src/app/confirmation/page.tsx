import { Spinner, VStack, Text } from '@chakra-ui/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ConfirmationHandler from '../features/user/ConfirmationHandler'
import { UserRequestType } from '@/types/types'

export const metadata: Metadata = {
  title: 'メールアドレス認証中 | Bon Voyage Collection',
  description: 'メールアドレス認証中です。',
  keywords: '',
  robots: {
    index: false,
  },
}

type ConfirmationProps = {
  searchParams: {
    confirmation_token: string
    request_action: UserRequestType
  }
}

export default async function Confirmation({
  searchParams,
}: ConfirmationProps) {
  if (!searchParams.confirmation_token) {
    redirect('/?status=invalid_url')
  }

  const confirmationToken = searchParams.confirmation_token
  const requestAction = searchParams.request_action

  return (
    <>
      <VStack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        spacing={4}
        w="100%"
      >
        <Spinner size="xl" speed="0.8s" thickness="4px" color="brand.primary" />
        <Text fontWeight="bold" fontSize="lg">
          メールアドレスを認証中です
        </Text>
      </VStack>
      <ConfirmationHandler
        confirmationToken={confirmationToken}
        requestAction={requestAction}
      />
    </>
  )
}
