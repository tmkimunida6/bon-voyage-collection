'use client'

import { Alert, AlertDescription, AlertIcon, Stack } from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import { registerAction } from '@/actions/registerAction'
import { registerSchema } from '@/schemas/userSchema'
import InputWithLabel from '../../molecules/InputWithLabel'
import SubmitButton from '../../atoms/SubmitButton'

const RegisterForm = () => {
  const [lastResult, action] = useFormState(registerAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema })
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
          placeholder="パスワードを入力して下さい"
          errors={fields.password.errors}
        />
        <InputWithLabel
          label="パスワード確認"
          type="password"
          name={fields.password_confirmation.name}
          placeholder="パスワードを入力して下さい"
          errors={fields.password_confirmation.errors}
        />
        <SubmitButton>登録する</SubmitButton>
      </Stack>
    </form>
  )
}

export default RegisterForm
