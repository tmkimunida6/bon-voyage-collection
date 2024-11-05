import { Heading, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import PostForm from '@/components/organisms/form/PostForm'

const Post: NextPage = () => {
  return (
    <>
      <HStack mb={6}>
        <Heading as="h1">コレクションへの追加</Heading>
      </HStack>
      <PostForm />
    </>
  )
}

export default Post
