import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'
import TextIconLink from '@/components/molecules/TextIconLink'
import ChangePasswordForm from '@/components/organisms/form/ChangePasswordForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'メールアドレス変更｜アカウント設定 | Bon Voyage Collcection',
  description: 'メールアドレスの変更が可能です。',
  keywords: '',
}

export default async function SignIn() {
  await checkLoginStatus()

  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">パスワード変更</Heading>
      </HStack>
      <ChangePasswordForm />
      <TextIconLink
        iconPosition="left"
        iconName="FaChevronLeft"
        href="/setting"
      >
        戻る
      </TextIconLink>
    </Stack>
  )
}
