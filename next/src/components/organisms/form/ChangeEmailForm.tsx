/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  Input,
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
import { changeEmailAction } from '@/actions/changeEmailAction'
import TextIconLink from '@/components/molecules/TextIconLink'
import { changeEmailSchema } from '@/schemas/userSchema'

type ChangeEmailFormType = {
  email: string
}

const ChangeEmailForm = ({ email }: ChangeEmailFormType) => {
  const [lastResult, action] = useFormState(changeEmailAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changeEmailSchema(email) })
    },
  })

  // 成功時のメッセージ
  const toast = useToast()
  useEffect(() => {
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
          label="メールアドレス"
          type="email"
          name={fields.new_email.name}
          placeholder="example@email.com"
          errors={fields.new_email.errors}
          autoComplete="email"
        />
        <Stack spacing={2}>
          <InputWithLabel
            label="現在のパスワード"
            type="password"
            name={fields.current_password.name}
            placeholder="パスワードを入力してください"
            errors={fields.current_password.errors}
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
        <SubmitButton>
          変更する
          <Text as="span" fontSize="xs">
            （認証メール送信）
          </Text>
        </SubmitButton>
      </Stack>
      <Input type="hidden" name="current_email" value={email} />
    </form>
  )
}

export default ChangeEmailForm
