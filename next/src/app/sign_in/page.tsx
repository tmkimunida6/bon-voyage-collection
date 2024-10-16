'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Heading,
  HStack,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import type { NextPage } from 'next'
import { useFormState } from 'react-dom'
import SubmitButton from '../components/atoms/SubmitButton'
import InputWithLabel from '../components/molecules/InputWithLabel'
import TextIconLink from '../components/molecules/TextIconLink'
import { signinAction } from '@/actions/signinAction'
import { signinSchema } from '@/schemas/userSchema'

const Login: NextPage = () => {
  const [lastResult, action] = useFormState(signinAction, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema })
    },
  })

  return (
    <>
      <HStack mb={6}>
        <Heading as="h1">ログイン</Heading>
        <Spacer />
        <TextIconLink iconName={'FaPen'} iconPosition="left" href="#">
          アカウント作成
        </TextIconLink>
      </HStack>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        {form.errors && (
          <Alert status="error" my={4} borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{form.errors[0]}</AlertDescription>
          </Alert>
        )}
        <Stack spacing={6}>
          <InputWithLabel
            label="メールアドレス"
            type="email"
            name={fields.email.name}
            placeholder="example@email.com"
            errors={fields.email.errors}
          />
          <InputWithLabel
            label="パスワード"
            type="password"
            name={fields.password.name}
            placeholder="パスワードを入力して下さい"
            errors={fields.password.errors}
          />
          <SubmitButton>ログイン</SubmitButton>
        </Stack>
      </form>
    </>
  )
}

export default Login
