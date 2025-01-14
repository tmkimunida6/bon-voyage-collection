'use client'

import { Alert, AlertDescription, AlertIcon, Stack } from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { signinAction } from '@/actions/signinAction'
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
          placeholder="パスワードを入力してください"
          errors={fields.password.errors}
        />
        <SubmitButton>ログイン</SubmitButton>
      </Stack>
    </form>
  )
}

export default SigninForm
