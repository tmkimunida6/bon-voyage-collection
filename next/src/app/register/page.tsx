import { Box, Heading, HStack } from '@chakra-ui/react'
import RegisterForm from '@/components/organisms/form/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '会員登録 | Bon Voyage Collcection',
  description: 'Bon Voyage Collcectionに会員登録して、あなただけのお土産コレクションを作成しましょう。',
  keywords: 'お土産,Souvenir,会員登録,Bon Voyage Collection'
}

export default function Register() {
  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">ユーザー登録</Heading>
      </HStack>
      <RegisterForm />
    </Box>
  )
}
