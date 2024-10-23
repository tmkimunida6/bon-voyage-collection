import { VStack } from '@chakra-ui/react'
import { SignUp } from '@clerk/nextjs'
import { NextPage } from 'next'

const SignUpPage: NextPage = () => {
  return (
    <VStack>
      <SignUp />
    </VStack>
  )
}

export default SignUpPage
