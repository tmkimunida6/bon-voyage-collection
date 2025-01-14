/* eslint react-hooks/exhaustive-deps: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { changePasswordAction } from '@/actions/changePasswordAction'
import { signoutAction } from '@/actions/signoutAction'
import { changePasswordSchema } from '@/schemas/userSchema'
import TextIconLink from '@/components/molecules/TextIconLink'

const ChangePasswordForm = () => {
  const [lastResult, action] = useFormState(changePasswordAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changePasswordSchema })
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
        <Stack spacing={2}>
          <InputWithLabel
            label="現在のパスワード"
            type="password"
            name={fields.current_password.name}
            placeholder="現在のパスワードを入力してください"
            errors={fields.current_password.errors}
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
