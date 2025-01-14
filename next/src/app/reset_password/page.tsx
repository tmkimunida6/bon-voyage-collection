import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Metadata } from 'next'
import BackLink from '@/components/atoms/BackLink'
import ResetPasswordRequestForm from '@/components/organisms/form/ResetPasswordRequestForm'

export const metadata: Metadata = {
  title: 'パスワードリセット｜アカウント設定 | Bon Voyage Collcection',
  description: 'ご登録のメールアドレスを入力してください',
  keywords: '',
}

export default async function ResetPassword() {
  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">パスワードリセット</Heading>
      </HStack>
      <Text>
        ご登録のメールアドレスを入力してください。
        <br />
        パスワードリセット用のURLが送信されます。
      </Text>
      <ResetPasswordRequestForm />
      <BackLink>戻る</BackLink>
    </Stack>
  )
}
