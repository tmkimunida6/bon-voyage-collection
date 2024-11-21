'use client'

import { Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import TextIconLink from '@/components/molecules/TextIconLink'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <VStack spacing={6} py={10} maxW="660px" mx="auto">
      <Heading as="h2" fontSize="xl">
        予期せぬエラーが発生しました。
      </Heading>
      <Button variant="primary" onClick={() => reset()}>
        元のページに戻る
      </Button>
      <Flex width="100%">
        <TextIconLink iconName="FaChevronLeft" iconPosition="left" href="/">
          TOPページへ
        </TextIconLink>
      </Flex>
    </VStack>
  )
}
