'use client'

import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useFormState } from 'react-dom'
import InputWithLabel from '../components/molecules/InputWithLabel'
import TextIconLink from '../components/molecules/TextIconLink'
import { signinAction } from '@/actions/signinAction'


const Login: NextPage = () => {
  const [lastResult, handleSignin] = useFormState(signinAction, undefined);

  return (
    <>
      <HStack mb={6}>
        <Heading as="h1">ログイン</Heading>
        <Spacer />
        <TextIconLink iconName={'FaPen'} iconPosition="left" href="#">
          アカウント作成
        </TextIconLink>
      </HStack>
      <form action={handleSignin}>
        <Stack spacing={6}>
          <InputWithLabel
            label="Email"
            type="email"
            name="email"
            placeholder="example@email.com"
          />
          <InputWithLabel
            label="パスワード"
            type="password"
            name="password"
            placeholder="パスワードを入力して下さい"
          />
          <ButtonGroup justifyContent="center">
            <Button type="submit" variant="primary">
              ログイン
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </>
  )
}

export default Login
