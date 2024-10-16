import { Heading, HStack, Spacer } from '@chakra-ui/react'
import type { NextPage } from 'next'
import TextIconLink from '../components/molecules/TextIconLink'
import FormController from '../components/organisms/form/FormController'

const Login: NextPage = () => {
  return (
    <>
      <HStack mb={6}>
        <Heading as="h1">ログイン</Heading>
        <Spacer />
        <TextIconLink iconName={'FaPen'} iconPosition="left" href="#">
          アカウント作成
        </TextIconLink>
      </HStack>
      <FormController formType="signin" submitText="ログイン" />
    </>
  )
}

export default Login
