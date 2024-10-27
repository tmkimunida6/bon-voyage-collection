import { Heading, HStack, Text, Stack, Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'

const Temporary: NextPage = () => {
  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">仮登録完了</Heading>
      </HStack>
      <Text>
        ご登録のメールアドレスに認証用リンクを送信しました。
        <br />
        メールを確認し、ユーザー登録を完了させて下さい。
      </Text>
      <Button variant="primary" as={NextLink} href="/">
        TOPへ戻る
      </Button>
    </Stack>
  )
}

export default Temporary
