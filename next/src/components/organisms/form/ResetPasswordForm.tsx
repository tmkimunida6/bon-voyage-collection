/* eslint react-hooks/exhaustive-deps: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { resetPasswordAction } from '@/actions/resetPasswordAction'
import { signoutAction } from '@/actions/signoutAction'
import { resetPasswordSchema } from '@/schemas/userSchema'

type ResetPasswordFormProps = {
  resetPasswordToken: string
}

const ResetPasswordForm = ({ resetPasswordToken }: ResetPasswordFormProps) => {
  const [lastResult, action] = useFormState(resetPasswordAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resetPasswordSchema })
    },
  })
  const router = useRouter()

  // 成功時のメッセージ
  const toast = useToast()
  useEffect(() => {
    const handleSuccessAction = async () => {
      if (lastResult?.status === 'success') {
        toast({
          title: 'パスワードが変更されました。',
          description: 'お手数ですが、再度ログインしなおしてください。',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        try {
          await signoutAction()
          router.push('/sign_in')
        } catch (error: any) {
          toast({
            title: error.message,
            status: error.status,
            duration: 5000,
            isClosable: true,
          })
        }
      }
    }
    handleSuccessAction()
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
          label="新しいパスワード"
          type="password"
          name={fields.password.name}
          placeholder="新しいパスワードを入力してください"
          errors={fields.password.errors}
        />
        <InputWithLabel
          label="新しいパスワード（確認）"
          type="password"
          name={fields.password_confirmation.name}
          placeholder="新しいパスワードを入力してください"
          errors={fields.password_confirmation.errors}
        />
        <Input
          type="hidden"
          value={resetPasswordToken}
          name="reset_password_token"
          readOnly
        />
        <SubmitButton>変更する</SubmitButton>
      </Stack>
    </form>
  )
}

export default ResetPasswordForm
