import { Box, Heading, HStack, Spacer } from '@chakra-ui/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import TextIconLink from '@/components/molecules/TextIconLink'
import SigninForm from '@/components/organisms/form/SigninForm'
import { fetchUserState } from '@/utils/fetchUserState'

export const metadata: Metadata = {
  title: 'ログイン | Bon Voyage Collcection',
  description:
    'Bon Voyage Collcectionにログインして、あなただけのお土産コレクションを作成しましょう。',
  keywords: 'お土産,Souvenir,ログイン,Bon Voyage Collection',
}

export default async function SignIn() {
  const user = await fetchUserState()
  if (user.isSignedIn) {
    redirect('/mypage')
  }

  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">ログイン</Heading>
        <Spacer />
        <TextIconLink iconName={'FaPen'} iconPosition="left" href="/register">
          アカウント作成
        </TextIconLink>
      </HStack>
      <SigninForm />
    </Box>
  )
}
