'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { registerAction } from '@/actions/registerAction'
import AgreeToPolicyBox from '@/app/features/user/AgreeToPolicyBox'
import { registerSchema } from '@/schemas/userSchema'

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
          autoComplete="email"
        />
        <InputWithLabel
          label="パスワード"
          type="password"
          name={fields.password.name}
          placeholder="パスワードを入力してください"
          errors={fields.password.errors}
          autoComplete="new-password"
        />
        <InputWithLabel
          label="パスワード（確認）"
          type="password"
          name={fields.password_confirmation.name}
          placeholder="パスワードを入力してください"
          errors={fields.password_confirmation.errors}
          autoComplete="new-password"
        />
        <VStack spacing={4} mt={6}>
          <AgreeToPolicyBox
            name={fields.agreeToPolicy.name}
            errors={fields.agreeToPolicy.errors}
          />
          <SubmitButton>登録する</SubmitButton>
        </VStack>
      </Stack>
    </form>
  )
}

export default RegisterForm
