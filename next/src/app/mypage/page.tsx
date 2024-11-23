import {
  Avatar,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { Metadata } from 'next'
import MySouvenirList from '../features/favorite/MySouvenirList'
import CollectionCount from '../features/mypage/CollectionCount'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'マイページ | Bon Voyage Collcection',
  description:
    '記録したお土産と欲しいお土産を一覧でチェック。あなただけのお土産コレクション管理しましょう。',
  keywords: 'お土産,Souvenir,マイページ,Bon Voyage Collection',
}

export default async function Mypage() {
  const user = await checkLoginStatus()

  return (
    <Stack spacing={6}>
      <HStack>
        <Avatar size="sm" />
        <Text fontSize="lg">{user.name || `user_${user.alias_id}`}</Text>
      </HStack>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab gap={2}>
            買った！
            <CollectionCount type="myPost" />
          </Tab>
          <Tab gap={2}>
            欲しい！
            <CollectionCount type="favoritedSouvenir" />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} pt={6}>
            <MySouvenirList type="myPost" />
          </TabPanel>
          <TabPanel p={0} pt={6}>
            <MySouvenirList type="favoritedSouvenir" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
