'use client'

import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import CustomIcon from '@/components/atoms/CustomIcon'
import Rating from '@/components/molecules/Rating'
import { PostType } from '@/types/types'
import { useState } from 'react'

type PostCardProps = {
  post: PostType
}

const PostCard = ({ post }: PostCardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <Card key={post.user.alias_id} p={4} boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.25)">
      <Stack spacing={2}>
        <HStack>
          <Avatar size="xs" />
          <Text fontSize="xs">{post.user.name || `user_${post.user.alias_id}`}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Heading fontSize="sm">{post.souvenir.name}</Heading>
          <CustomIcon iconName="FaRegBookmark" color="brand.secondary" />
        </HStack>
        <HStack spacing={6}>
          {post.rating && <Rating rate={Number(post.rating)} />}
          {(post.for_who || post.age) && (
            <HStack>
              <CustomIcon iconName="FaHandHoldingHeart" color="brand.primary" />
              <Text fontSize="xs" isTruncated>{post.for_who} {(post.for_who && post.age) && "/"} {post.age}</Text>
            </HStack>
          )}
        </HStack>
        {post.review && (
          <Stack spacing={1}>
            <Text fontSize="sm" noOfLines={post.review.length > 75 && !isVisible ? 3 : undefined}>{post.review}</Text>
            {post.review.length > 75 && (
              <HStack spacing={1} width="max-content" ml="auto">
                <Button variant="ghost" fontSize="xs" color="brand.link" p={0} h="auto" onClick={() => setIsVisible((prev) => !prev)}>{isVisible ? '閉じる' : '続きを読む'}</Button>
                <CustomIcon iconName={isVisible ? 'FaChevronUp' : 'FaChevronDown'} color="brand.link" fontSize="xs" />
              </HStack>
            )}
          </Stack>
        )}
      </Stack>
      <Flex gap={4} mt={4}>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          // maxW="calc(50% - 0.5rem)"
        />
        {/* <Stack maxW="calc(50% - 0.5rem)">
          {(post.for_who || post.age) && (
            <HStack>
              <CustomIcon iconName="FaHandHoldingHeart" color="brand.primary" />
              <Text fontSize="xs" isTruncated>{post.for_who} {(post.for_who && post.age) && "/"} {post.age}</Text>
            </HStack>
          )}
        </Stack> */}
      </Flex>
    </Card>
  )
}

export default PostCard
