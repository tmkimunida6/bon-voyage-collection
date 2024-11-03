import { Heading, HStack, Text, Stack, Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import TextIconLink from '@/components/molecules/TextIconLink'

const CompleteSouvenirCreation: NextPage = () => {
  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">お土産の新規登録完了</Heading>
      </HStack>
      <Text>お土産の登録が完了しました。</Text>
      <Button variant="primary" as={NextLink} href="/">
        登録したお土産を見る
      </Button>
      <TextIconLink iconName="FaChevronLeft" iconPosition="left" href="/search">
        検索画面へ
      </TextIconLink>
    </Stack>
  )
}

export default CompleteSouvenirCreation
