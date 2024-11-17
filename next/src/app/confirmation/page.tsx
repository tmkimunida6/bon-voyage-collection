import { Spinner, VStack, Text } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { confirmUserAction } from '@/actions/confirmUserAction'
import { Metadata } from 'next'
import ConfirmationToaster from '../features/user/ConfirmationToaster'


export const metadata: Metadata = {
  title: 'ユーザー認証中 | Bon Voyage Collcection',
  description: 'ユーザー認証中です。',
  keywords: '',
  robots: {
    index: false,
  },
}

type ConfirmationProps = {
  searchParams: {
    confirmation_token: string
  }
}

export default async function Confirmation({ searchParams }: ConfirmationProps) {
  if(!searchParams.confirmation_token) {
    redirect('/?status=invalid_url')
  }

  const confirmationToken = searchParams.confirmation_token
  const result = await confirmUserAction(confirmationToken)

  return (
    <>
      <VStack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        spacing={4}
      >
        <Spinner size="xl" speed="0.8s" thickness="4px" color='brand.primary' />
        <Text fontWeight="bold" fontSize="lg">ユーザー認証中です</Text>
      </VStack>
      <ConfirmationToaster message={result.message} status={result.status} />
    </>
  )
}

