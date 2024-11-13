'use client'

import { Text, VStack } from '@chakra-ui/react'
import { useFavoriteStore } from '@/store/store'

export default function CollectionCount({
  length = undefined,
}: {
  length?: number | undefined
}) {
  const { favoritedSouvenirs } = useFavoriteStore()
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
        {length ? length : favoritedSouvenirs.length}
      </Text>
    </VStack>
  )
}
