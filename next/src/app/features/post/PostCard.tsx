'use client'

import {
  Avatar,
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

type PostCardProps = {
  post: PostType
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card key={post.id} p={4} boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.25)">
      <Stack spacing={2}>
        <HStack>
          <Avatar size="xs" />
          <Text fontSize="xs">dammyuser</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Heading fontSize="sm">{post.souvenir.name}</Heading>
          <CustomIcon iconName="FaRegBookmark" color="brand.secondary" />
        </HStack>
        <Rating rate={Number(post.rating)} />
        <Text fontSize="sm">{post.review}</Text>
      </Stack>
      <Flex gap={4} mt={4}>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          maxW="50%"
        />
        <Stack>
          {post.for_who && (
            <HStack>
              <CustomIcon iconName="FaHandHoldingHeart" color="brand.primary" />
              <Text fontSize="xs">{post.for_who}</Text>
            </HStack>
          )}
          {post.for_who && (
            <HStack>
              <CustomIcon iconName="FaHandHoldingHeart" color="brand.primary" />
              <Text fontSize="xs">{post.age}</Text>
            </HStack>
          )}
        </Stack>
      </Flex>
    </Card>
  )
}

export default PostCard
