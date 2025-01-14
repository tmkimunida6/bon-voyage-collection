import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'
import BackLink from '@/components/atoms/BackLink'
import ChangePasswordForm from '@/components/organisms/form/ChangePasswordForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'パスワード変更｜アカウント設定 | Bon Voyage Collcection',
  description: 'パスワードの変更が可能です。',
  keywords: '',
}

export default async function ChangePassword() {
  await checkLoginStatus()

  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">パスワード変更</Heading>
      </HStack>
      <ChangePasswordForm />
      <BackLink>戻る</BackLink>
    </Stack>
  )
}
