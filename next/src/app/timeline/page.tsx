import { Heading, HStack, Stack } from '@chakra-ui/react'
import PostCardList from '../features/post/PostCardList'
import { fetchPostDataAll } from '@/utils/fetchPostDataAll'

type TimelineProps = {
  searchParams: {
    page: string
  }
}

export default async function Timeline({ searchParams }: TimelineProps) {
  const page = Number(searchParams?.page) || 1
  const postResult = await fetchPostDataAll(page)

  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">タイムライン</Heading>
      </HStack>
      <PostCardList postResult={postResult} />
    </Stack>
  )
}
