/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { changeUserinfoAction } from '@/actions/changeUserinfoAction'
import { changePasswordSchema } from '@/schemas/userSchema'

const ChangePasswordForm = () => {
  const [lastResult, action] = useFormState(changeUserinfoAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changePasswordSchema })
    },
  })

  // 成功時のメッセージ
  const toast = useToast()
  useEffect(() => {
    console.log(lastResult)
    if (lastResult?.status === 'success') {
      toast({
        title: '認証用のメールが送信されました。',
        description:
          'メールに記載されているURLから変更手続きを完了させてください。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      redirect('/setting')
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
          label="現在のパスワード"
          type="password"
          name={fields.current_password.name}
          placeholder="現在のパスワードを入力してください"
          errors={fields.current_password.errors}
        />
        <InputWithLabel
          label="新しいパスワード"
          type="password"
          name={fields.new_password.name}
          placeholder="新しいパスワードを入力してください"
          errors={fields.new_password.errors}
        />
        <InputWithLabel
          label="新しいパスワード（確認）"
          type="password"
          name={fields.new_password_confirmation.name}
          placeholder="新しいパスワードを入力してください"
          errors={fields.new_password_confirmation.errors}
        />
        <SubmitButton>
          変更する
          <Text as="span" fontSize="xs">
            （認証メール送信）
          </Text>
        </SubmitButton>
      </Stack>
    </form>
  )
}

export default ChangePasswordForm
