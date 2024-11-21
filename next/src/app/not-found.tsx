'use client'

import { Button, Heading, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Error() {
  return (
    <VStack spacing={6} py={10} maxW="660px" mx="auto">
      <Heading as="h2" fontSize="xl">
        ページが存在しません。
      </Heading>
      <Button variant="primary" as={NextLink} href="/">
        TOPへ戻る
      </Button>
    </VStack>
  )
}
