'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Divider,
  Flex,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { signinAction } from '@/actions/signinAction'
import GoogleButton from '@/components/atoms/GoogleButton'
import TextIconLink from '@/components/molecules/TextIconLink'
import { signinSchema } from '@/schemas/userSchema'

const SigninForm = () => {
  const [lastResult, action] = useFormState(signinAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema })
    },
  })

  return (
    <>
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
            autoComplete="email"
          />
          <Stack spacing={2}>
            <InputWithLabel
              label="パスワード"
              type="password"
              name={fields.password.name}
              placeholder="パスワードを入力してください"
              errors={fields.password.errors}
              autoComplete="current-password"
            />
            <Flex justifyContent="right">
              <TextIconLink
                iconName={'FaRegQuestionCircle'}
                iconPosition="left"
                href="/reset_password"
              >
                パスワードをお忘れの方
              </TextIconLink>
            </Flex>
          </Stack>
          <SubmitButton>ログイン</SubmitButton>
        </Stack>
      </form>
      <Divider my={6} borderColor="gray.400" />
      <VStack spacing={4}>
        <Heading as="h2" fontSize="md">
          その他のサービスからログイン
        </Heading>
        <GoogleButton>Googleでログイン</GoogleButton>
      </VStack>
    </>
  )
}

export default SigninForm
