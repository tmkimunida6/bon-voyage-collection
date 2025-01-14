import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ResetPasswordForm from '@/components/organisms/form/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'パスワードリセット｜アカウント設定 | Bon Voyage Collcection',
  description: 'パスワードのリセットが可能です。',
  keywords: '',
  robots: {
    index: false,
  },
}

type ResetPasswordProps = {
  searchParams: {
    reset_password_token: string
  }
}

export default async function ResetPasswordNew({
  searchParams,
}: ResetPasswordProps) {
  // トークンがない場合はトップページへリダイレクト
  if (!searchParams.reset_password_token) {
    redirect('/?status=invalid_url')
  }

  const resetPasswordToken = searchParams.reset_password_token

  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">パスワードリセット</Heading>
      </HStack>
      <ResetPasswordForm resetPasswordToken={resetPasswordToken} />
    </Stack>
  )
}
