/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { SimpleGrid, Spinner, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import { useCurrentUserStore } from '@/store/index'
import { timelineResultType } from '@/types/types'
import { fetchPostDataAll } from '@/utils/fetchPostDataAll'
import { fetchPostDataBySouvenir } from '@/utils/fetchPostDataBySouvenir'

type PostCardListProps = {
  fetchedTimelineResult: timelineResultType
  souvenir_id?: string
  page: 'timeline' | 'detail'
}

const PostCardList = ({
  fetchedTimelineResult,
  souvenir_id,
  page,
}: PostCardListProps) => {
  const [timelineResult, setTimelineResult] = useState<timelineResultType>(
    fetchedTimelineResult,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const { currentUser } = useCurrentUserStore()
  const toast = useToast()
  const loader = useRef<HTMLDivElement | null>(null)

  const posts = timelineResult.posts

  const fetchMorePosts = async () => {
    if (loading || !timelineResult.pages.next_page) return

    try {
      setLoading(true)
      let newResult: timelineResultType
      if (page === 'timeline') {
        newResult = await fetchPostDataAll(timelineResult.pages.next_page)
      } else if (page === 'detail') {
        newResult = await fetchPostDataBySouvenir(
          souvenir_id as string,
          timelineResult.pages.next_page,
          currentUser?.alias_id,
        )
      }
      setTimelineResult((prevResult) => ({
        posts: [...prevResult.posts, ...newResult.posts],
        pages: newResult.pages,
      }))
    } catch (error) {
      toast({
        title:
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const currentLoader = loader.current

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts()
        }
      },
      { threshold: 1.0 },
    )

    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [timelineResult.pages.current_page])

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(272px, 1fr))"
      >
        {posts.map((post) => (
          <PostCard
            key={post.alias_id}
            post={post}
            setTimelineResult={setTimelineResult}
            page={page}
          />
        ))}
      </SimpleGrid>
      <VStack ref={loader} py={6}>
        {loading && <Spinner color="brand.primary" size="lg" thickness="3px" />}
      </VStack>
    </>
  )
}

export default PostCardList
