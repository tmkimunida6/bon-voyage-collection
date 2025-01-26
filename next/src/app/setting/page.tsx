import { Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'
import SettingLink from '../features/setting/SettingLink'
import SettingLinkWithAlert from '../features/setting/SettingLinkWithAlert'
import BackLink from '@/components/atoms/BackLink'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'アカウント設定 | Bon Voyage Collcection',
  description: 'アカウントに関する設定の変更が可能です。',
  keywords: '',
}

export default async function Setting() {
  await checkLoginStatus()

  return (
    <Stack maxW="660px" mx="auto" spacing={6}>
      <HStack>
        <Heading as="h1">アカウント設定</Heading>
      </HStack>
      <Stack spacing={0}>
        <SettingLink
          href="/setting/profile"
          linkText="プロフィール変更"
          icon="FaUserCog"
        />
        <SettingLink
          href="/setting/email"
          linkText="メールアドレス変更"
          icon="FaEnvelope"
        />
        <SettingLink
          href="/setting/password"
          linkText="パスワード変更"
          icon="FaLock"
        />
        <Flex borderBottom="1px solid" borderColor="brand.primary">
          <SettingLinkWithAlert
            linkText="ログアウト"
            icon="FaSignOutAlt"
            buttonType="signout"
          />
        </Flex>
        <Flex>
          <SettingLinkWithAlert
            linkText="アカウント削除"
            icon="FaTrash"
            buttonType="delete"
          />
        </Flex>
      </Stack>
      <BackLink href="/mypage">マイページに戻る</BackLink>
    </Stack>
  )
}
