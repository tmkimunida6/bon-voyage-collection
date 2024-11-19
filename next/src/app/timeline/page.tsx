/* eslint @typescript-eslint/no-unused-vars: 0 */

import { Spinner, Stack } from '@chakra-ui/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import PostCardList from '../features/post/PostCardList'
import { fetchPostDataAll } from '@/utils/fetchPostDataAll'

export const metadata: Metadata = {
  title: 'ホーム | Bon Voyage Collcection',
  description:
    '旅先で見つけたお土産の記録をタイムラインでチェックし、新しい出会いを見つけましょう。',
  keywords: 'お土産,Souvenir,タイムライン,SNS,Bon Voyage Collection',
}

type TimelineProps = {
  searchParams: {
    page: string
  }
}

export default async function Timeline({ searchParams }: TimelineProps) {
  const page = Number(searchParams?.page) || 1

  try {
    const fetchedTimelineResult = await fetchPostDataAll(page)
    return (
      <Stack spacing={6}>
        <Suspense fallback={<Spinner />}>
          <PostCardList
            fetchedTimelineResult={fetchedTimelineResult}
            page="timeline"
          />
        </Suspense>
      </Stack>
    )
  } catch (error) {
    redirect('/?status=server_error')
  }
}
