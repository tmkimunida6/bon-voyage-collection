/* eslint @typescript-eslint/no-unused-vars: 0 */

import { Stack, Text, VStack } from '@chakra-ui/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import RecommendCardSwiper from '../features/recommend/RecommendCardSwiper'
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
      <Stack spacing={4} maxW="660px" mx="auto">
        <Text fontSize="sm" fontWeight="bold" textAlign="center">
          気になるお土産は右にスワイプ！
          <br />
          スキップは左にスワイプ！
        </Text>
        <VStack position="relative" spacing={6}>
          <RecommendCardSwiper
            fetchedRecommendResult={fetchedRecommendResult}
          />
        </VStack>
        {/* <Text fontSize="md" fontWeight="bold">
        お気に入り: {favorites.length} 件
      </Text> */}
      </Stack>
    )
  } catch (error) {
    redirect('/?status=server_error')
  }
}
