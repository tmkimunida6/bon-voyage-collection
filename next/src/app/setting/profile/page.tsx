import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'
import TextIconLink from '@/components/molecules/TextIconLink'
import ChangeProfileForm from '@/components/organisms/form/ChangeProfileForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'
import BackLink from '@/components/atoms/BackLink'

export const metadata: Metadata = {
  title: 'プロフィール変更｜アカウント設定 | Bon Voyage Collcection',
  description: 'プロフィールの変更が可能です。',
  keywords: '',
}

export default async function ChangeProfile() {
  const user = await checkLoginStatus()

  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">プロフィール変更</Heading>
      </HStack>
      <ChangeProfileForm nickname={user.nickname} image={user.image} />
      <BackLink>戻る</BackLink>
    </Stack>
  )
}
