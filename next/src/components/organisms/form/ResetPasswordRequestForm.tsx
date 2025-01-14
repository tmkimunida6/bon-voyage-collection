/* eslint react-hooks/exhaustive-deps: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { resetPasswordRequestAction } from '@/actions/resetPasswordRequestAction'
import { resetPasswordRequestSchema } from '@/schemas/userSchema'

const ResetPasswordRequestForm = () => {
  const [lastResult, action] = useFormState(resetPasswordRequestAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resetPasswordRequestSchema })
    },
  })

  // 成功時のメッセージ
  const toast = useToast()
  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast({
        title: 'パスワードリセット用のメールが送信されました。',
        description:
          'メールに記載されているURLから変更手続きを完了させてください。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [lastResult])

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
        <SubmitButton>リセット用URLを送信</SubmitButton>
      </Stack>
    </form>
  )
}

export default ResetPasswordRequestForm
