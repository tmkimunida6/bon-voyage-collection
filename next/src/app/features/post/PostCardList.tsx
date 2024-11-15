/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { SimpleGrid, Spinner, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import { timelineResultType } from '@/types/types'
import { fetchPostDataAll } from '@/utils/fetchPostDataAll'

type PostCardListProps = {
  fetchedTimelineResult: timelineResultType
}

const PostCardList = ({ fetchedTimelineResult }: PostCardListProps) => {
  const [timelineResult, setTimelineResult] = useState<timelineResultType>(
    fetchedTimelineResult,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const loader = useRef<HTMLDivElement | null>(null)

  const posts = timelineResult.posts

  const fetchMorePosts = async () => {
    if (loading || !timelineResult.pages.next_page) return

    try {
      setLoading(true)
      const newResult = await fetchPostDataAll(timelineResult.pages.next_page)
      setTimelineResult((prevResult) => ({
        posts: [...prevResult.posts, ...newResult.posts],
        pages: newResult.pages,
      }))
    } catch (error: any) {
      toast({
        title: error.message,
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
