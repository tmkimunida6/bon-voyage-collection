import { Box, Heading, HStack } from '@chakra-ui/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import RegisterForm from '@/components/organisms/form/RegisterForm'
import { fetchUserState } from '@/utils/fetchUserState'

export const metadata: Metadata = {
  title: '会員登録 | Bon Voyage Collection',
  description:
    'Bon Voyage Collectionに会員登録して、あなただけのお土産コレクションを作成しましょう。',
  keywords: 'お土産,Souvenir,会員登録,Bon Voyage Collection',
}

export default async function Register() {
  const user = await fetchUserState()
  if (user.isSignedIn) {
    redirect('/mypage')
  }

  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">ユーザー登録</Heading>
      </HStack>
      <RegisterForm />
    </Box>
  )
}
