import { Heading, HStack, Spinner, Stack } from '@chakra-ui/react'
import PostCardList from '../features/post/PostCardList'
import { fetchPostDataAll } from '@/utils/fetchPostDataAll'
import { Suspense } from 'react'
import { redirect } from 'next/dist/server/api-utils'

type TimelineProps = {
  searchParams: {
    page: string
  }
}

export default async function Timeline({ searchParams }: TimelineProps) {
  const page = Number(searchParams?.page) || 1
  const fetchedTimelineResult = await fetchPostDataAll(page)

  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">タイムライン</Heading>
      </HStack>
      <Suspense fallback={<Spinner />}>
        <PostCardList fetchedTimelineResult={fetchedTimelineResult} />
      </Suspense>
    </Stack>
  )
}
