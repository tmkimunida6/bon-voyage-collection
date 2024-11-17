import { Box, Heading, HStack } from '@chakra-ui/react'
import RegisterForm from '@/components/organisms/form/RegisterForm'

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
