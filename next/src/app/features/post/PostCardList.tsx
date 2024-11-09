/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { SimpleGrid, Spinner, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import { PagesType, PostType } from '@/types/types'
import { fetchPostDataAll } from '@/utils/fetchPostDataAll'

type PostCardListProps = {
  postResult: { posts: Array<PostType>; pages: PagesType }
}

const PostCardList = ({ postResult }: PostCardListProps) => {
  const [result, setResult] = useState<{
    posts: Array<PostType>
    pages: PagesType
  }>(postResult)
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const loader = useRef<HTMLDivElement | null>(null)

  const posts = result.posts

  const fetchMorePosts = async () => {
    if (loading || !result.pages.next_page) return

    try {
      setLoading(true)
      const newResult = await fetchPostDataAll(result.pages.next_page)
      setResult((prevResult) => ({
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
  }, [result.pages.current_page])

  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {posts.map((post) => (
          <PostCard key={post.alias_id} post={post} />
        ))}
      </SimpleGrid>
      <VStack ref={loader} py={6}>
        {loading && <Spinner color="brand.primary" size="lg" thickness="3px" />}
      </VStack>
    </>
  )
}

export default PostCardList
