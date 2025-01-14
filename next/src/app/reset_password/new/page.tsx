import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'
import ResetPasswordForm from '@/components/organisms/form/ResetPasswordForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'パスワードリセット｜アカウント設定 | Bon Voyage Collcection',
  description: 'パスワードのリセットが可能です。',
  keywords: '',
  robots: {
    index: false,
  },
}

export default async function ResetPasswordNew() {
  await checkLoginStatus()

  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">パスワードリセット</Heading>
      </HStack>
      <ResetPasswordForm />
    </Stack>
  )
}
