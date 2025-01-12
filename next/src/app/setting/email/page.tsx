import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Metadata } from 'next'
import ChangeProfileForm from '@/components/organisms/form/ChangeProfileForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'
import ChangeEmailForm from '@/components/organisms/form/ChangeEmailForm'

export const metadata: Metadata = {
  title: 'メールアドレス変更｜アカウント設定 | Bon Voyage Collcection',
  description: 'メールアドレスの変更が可能です。',
  keywords: '',
}

export default async function SignIn() {
  const user = await checkLoginStatus()

  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">メールアドレス変更</Heading>
      </HStack>
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Text fontWeight="bold">現在のメールアドレス</Text>
          <Text>{user.email}</Text>
        </Stack>
        <ChangeEmailForm email={user.email}/>
      </Stack>
    </Box>
  )
}
