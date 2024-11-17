import {
  Avatar,
  HStack,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import FavoriteSouvenirList from '../features/favorite/FavoriteSouvenirList'
import CollectionCount from '../features/mypage/CollectionCount'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import { PostType } from '@/types/types'
import { checkLoginStatus } from '@/utils/checkLoginStatus'
import { fetchPostDataByUser } from '@/utils/fetchPostDataByUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'マイページ | Bon Voyage Collcection',
  description: '記録したお土産と欲しいお土産を一覧でチェック。あなただけのお土産コレクション管理しましょう。',
  keywords: 'お土産,Souvenir,マイページ,Bon Voyage Collection'
}

export default async function Mypage() {
  const user = await checkLoginStatus()
  const my_posts = await fetchPostDataByUser()

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
            <CollectionCount length={my_posts.length} />
          </Tab>
          <Tab gap={2}>
            欲しい！
            <CollectionCount />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} pt={6}>
            <SimpleGrid
              templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
              spacingX={2}
              spacingY={4}
            >
              {my_posts.map((post: PostType) => (
                <SouvenirCard
                  key={post.alias_id}
                  size="lg"
                  souvenir={post.souvenir}
                  isFavoritable={false}
                  rating={post.rating}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel p={0} pt={6}>
            <FavoriteSouvenirList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
