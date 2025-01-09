import { Box, Heading, HStack } from '@chakra-ui/react'
import { Metadata } from 'next'
import ChangeProfileForm from '@/components/organisms/form/ChangeProfileForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'プロフィール変更｜アカウント設定 | Bon Voyage Collcection',
  description: 'プロフィールの変更が可能です。',
  keywords: '',
}

export default async function SignIn() {
  const user = await checkLoginStatus()

  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">プロフィール変更</Heading>
      </HStack>
      <ChangeProfileForm nickname={user.nickname} image={user.image} />
    </Box>
  )
}
