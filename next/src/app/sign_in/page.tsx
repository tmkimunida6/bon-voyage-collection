import { Box, Heading, HStack, Spacer } from '@chakra-ui/react'
import TextIconLink from '@/components/molecules/TextIconLink'
import SigninForm from '@/components/organisms/form/SigninForm'

export default function SignIn() {
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

