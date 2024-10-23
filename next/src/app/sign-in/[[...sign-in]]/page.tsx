import { VStack } from '@chakra-ui/react'
import { SignIn } from '@clerk/nextjs'
import { NextPage } from 'next'

const SignInPage: NextPage = () => {
  return (
    <VStack>
      <SignIn />
    </VStack>
  )
}

export default SignInPage
