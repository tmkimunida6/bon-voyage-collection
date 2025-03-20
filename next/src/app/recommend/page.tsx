/* eslint @typescript-eslint/no-unused-vars: 0 */

import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import RecommendCardSwiper from '@/app/features/recommend/RecommendCardSwiper'
import { fetchRecommendSouvenirs } from '@/utils/fetchRecommendSouvenirs'

export const metadata: Metadata = {
  title: 'おすすめのお土産 | Bon Voyage Collcection',
  description:
    'あなたにぴったりのお土産をおすすめします。気に入ったお土産をスワイプで保存しましょう！',
  keywords: 'お土産,Souvenir,おすすめ,スワイプ,Bon Voyage Collection',
}

type RecommendProps = {
  searchParams: {
    word: string
    category_id: string
  }
}

export default async function Recommend({ searchParams }: RecommendProps) {
  try {
    const fetchedRecommendResult = await fetchRecommendSouvenirs(
      searchParams?.word || '',
      searchParams?.category_id || '',
    )
    return (
      <Box maxW="660px" mx="auto">
        <Stack
          spacing={4}
          mx="calc(50% - 50cqi)"
          px={4}
          pb={6}
          h="100%"
          overflow="hidden"
        >
          <VStack spacing={1}>
            <Heading fontSize="lg" textAlign="center">
              お土産を最大10個ランダムで紹介！
            </Heading>
            <Text fontSize="md" textAlign="center">
              最後までスワイプして、
              <br />
              気になるお土産を保存しましょう！
            </Text>
          </VStack>
          <Box>
            <VStack position="relative" spacing={6} maxW="660px" mx="auto">
              <RecommendCardSwiper
                fetchedRecommendResult={fetchedRecommendResult}
              />
            </VStack>
          </Box>
        </Stack>
      </Box>
    )
  } catch (error) {
    redirect('/?status=server_error')
  }
}
