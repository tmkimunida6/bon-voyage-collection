'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '@/components/molecules/InputWithLabel'
import TextIconLink from '@/components/molecules/TextIconLink'
import { changeProfileSchema } from '@/schemas/userSchema'
import UploadImageForm from '@/components/molecules/UploadImageForm'
import { changeProfileAction } from '@/actions/changeProfileAction'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

type ChangeProfileFormProps = {
  user_id: string
}

const ChangeProfileForm = ({ user_id }: ChangeProfileFormProps) => {
  const [lastResult, action] = useFormState(changeProfileAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changeProfileSchema })
    },
  })

  const toast = useToast()
  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast({
        title: 'プロフィールが更新されました。',
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
        <Box>
          <InputWithLabel
            label="表示名"
            type="text"
            name={fields.nickname.name}
            placeholder="例：ボンボヤージュ太郎"
            errors={fields.nickname.errors}
            isRequired={false}
          />
          <Text fontSize="xs" color="gray.500">*未設定時はユーザーIDが表示名となります。</Text>
        </Box>
        <UploadImageForm
          name={fields.image.name}
          errors={fields.image.errors}
          isRequired={true}
          isAvatar={true}
        />
        <SubmitButton>変更を完了する</SubmitButton>
        <TextIconLink
          iconPosition="left"
          iconName="FaChevronLeft"
          href="/setting"
        >
          戻る
        </TextIconLink>
      </Stack>
    </form>
  )
}

export default ChangeProfileForm
