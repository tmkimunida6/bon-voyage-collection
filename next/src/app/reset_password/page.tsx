import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Metadata } from 'next'
import TextIconLink from '@/components/molecules/TextIconLink'
import ResetPasswordRequestForm from '@/components/organisms/form/ResetPasswordRequestForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'パスワードリセット｜アカウント設定 | Bon Voyage Collcection',
  description: 'ご登録のメールアドレスを入力してください',
  keywords: '',
}

export default async function ResetPassword() {
  await checkLoginStatus()

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
      <TextIconLink
        iconPosition="left"
        iconName="FaChevronLeft"
        href="/sign_in"
      >
        ログイン画面へ
      </TextIconLink>
    </Stack>
  )
}
