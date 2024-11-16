import { Spinner, Stack } from '@chakra-ui/react'
import { Suspense } from 'react'
import PostCardList from '../features/post/PostCardList'
import { fetchPostDataAll } from '@/utils/fetchPostDataAll'

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
      <Suspense fallback={<Spinner />}>
        <PostCardList
          fetchedTimelineResult={fetchedTimelineResult}
          page="timeline"
        />
      </Suspense>
    </Stack>
  )
}
