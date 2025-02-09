import { Heading, HStack, Text, Stack, Button } from '@chakra-ui/react'
import { Metadata } from 'next'
import NextLink from 'next/link'

export const metadata: Metadata = {
  title: '会員登録完了 | Bon Voyage Collection',
  description:
    'Bon Voyage Collectionへの会員登録が完了しました。さっそくあなただけのお土産コレクションを作成しましょう。',
  keywords: '',
  robots: {
    index: false,
  },
}

export default function Temporary() {
  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">仮登録完了</Heading>
      </HStack>
      <Stack spacing={4}>
        <Text>
          ご登録のメールアドレスに認証用リンクを送信しました。
          <br />
          メールを確認し、ユーザー登録を完了させてください。
        </Text>
        <Text fontSize="sm" color="gray.500">
          ※万が一メールが届かない場合は、迷惑メールフォルダに自動的に振り分けられている可能性がありますので、一度ご確認いただきますようお願いいたします。
        </Text>
      </Stack>
      <Button variant="primary" as={NextLink} href="/">
        TOPへ戻る
      </Button>
    </Stack>
  )
}
