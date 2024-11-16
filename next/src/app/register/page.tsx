import { Box, Heading, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import RegisterForm from '@/components/organisms/form/RegisterForm'

const Register: NextPage = () => {
  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">ユーザー登録</Heading>
      </HStack>
      <RegisterForm />
    </Box>
  )
}

export default Register
