'use client'

import {
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import Rating from '@/components/molecules/Rating'
import { PostType } from '@/types/types'

type PostCardSmallProps = {
  post: PostType
}

const PostCardSmall = ({ post }: PostCardSmallProps) => {
  return (
    <Card p={2} boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.25)">
      <Stack spacing={2}>
        <Image
          src={post.image_url || post.souvenir.image_url}
          alt={post.souvenir.name}
          borderRadius="4px"
        />
        <Heading size="xs" noOfLines={2}>{post.souvenir.name}</Heading>
        <Rating rate={post.rating ? Number(post.rating) : 0} isSmall={true} />
      </Stack>
    </Card>
  )
}

export default PostCardSmall
