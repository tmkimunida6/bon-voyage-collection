'use client'

import { Text, VStack } from '@chakra-ui/react'
import { useFavoriteStore, useMyPostsStore } from '@/store/store'

type CollectionCountProps = {
  type: 'myPost' | 'favoritedSouvenir'
}

export default function CollectionCount({ type }: CollectionCountProps) {
  const { favoritedSouvenirs } = useFavoriteStore()
  const { myPosts } = useMyPostsStore()
  return (
    <VStack
      border="1px solid"
      borderRadius="50%"
      minW="24px"
      minH="24px"
      p="2px"
      justifyContent="center"
    >
      <Text as={'span'} fontSize="sm" lineHeight={1} fontWeight="bold">
        {type === 'myPost' ? myPosts.length : favoritedSouvenirs.length}
      </Text>
    </VStack>
  )
}
