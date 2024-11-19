import { Box, Heading, HStack } from '@chakra-ui/react'
import { Metadata } from 'next'
import NewSouvenirForm from '@/components/organisms/form/NewSouvenirForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export const metadata: Metadata = {
  title: 'お土産の新規登録 | Bon Voyage Collcection',
  description:
    'お土産を新たに登録して、あなただけのお土産コレクションを作成しましょう。',
  keywords: 'お土産,Souvenir,お土産登録,コレクション,Bon Voyage Collection',
}

export default async function NewSouvenir() {
  await checkLoginStatus()

  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">お土産の新規登録</Heading>
      </HStack>
      <NewSouvenirForm />
    </Box>
  )
}
