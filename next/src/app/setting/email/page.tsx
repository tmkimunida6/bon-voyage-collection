import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Metadata } from 'next'
import BackLink from '@/components/atoms/BackLink'
import ChangeEmailForm from '@/components/organisms/form/ChangeEmailForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'メールアドレス変更｜アカウント設定 | Bon Voyage Collcection',
  description: 'メールアドレスの変更が可能です。',
  keywords: '',
}

export default async function SignIn() {
  const user = await checkLoginStatus()

  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">メールアドレス変更</Heading>
      </HStack>
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Text fontWeight="bold">現在のメールアドレス</Text>
          <Text as="p">{user.email}</Text>
        </Stack>
        <ChangeEmailForm email={user.email} />
      </Stack>
      <BackLink>戻る</BackLink>
    </Stack>
  )
}
