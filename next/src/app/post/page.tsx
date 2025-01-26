import { Box, Heading, HStack } from '@chakra-ui/react'
import { Metadata } from 'next'
import PostForm from '@/components/organisms/form/PostForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'お土産コレクションへの追加 | Bon Voyage Collection',
  description: '旅先で出会ったお土産をコレクションへ追加＆シェアしましょう。',
  keywords: 'お土産,Souvenir,投稿,コレクション,Bon Voyage Collection',
}

export default async function Post() {
  await checkLoginStatus()

  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">コレクションへの追加</Heading>
      </HStack>
      <PostForm />
    </Box>
  )
}
