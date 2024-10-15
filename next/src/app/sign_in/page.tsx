import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import InputWithLabel from '../components/molecules/InputWithLabel'
import TextIconLink from '../components/molecules/TextIconLink'

const Login: NextPage = () => {
  return (
    <>
      <Stack spacing={6}>
        <HStack>
          <Heading as="h1">ログイン</Heading>
          <Spacer />
          <TextIconLink iconName={'FaPen'} iconPosition="left" href="#">
            アカウント作成
          </TextIconLink>
        </HStack>
        <InputWithLabel
          label="Email"
          type="email"
          placeholder="example@email.com"
        />
        <InputWithLabel
          label="パスワード"
          type="password"
          placeholder="パスワードを入力して下さい"
        />
        <ButtonGroup justifyContent="center">
          <Button type="submit" variant="primary">
            ログイン
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  )
}

export default Login
