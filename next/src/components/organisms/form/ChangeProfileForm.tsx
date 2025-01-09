'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import TextIconLink from '@/components/molecules/TextIconLink'
import { changeProfileSchema } from '@/schemas/userSchema'
import { changeProfileAction } from '@/actions/changeProfileAction'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import UploadAvatarForm from '@/components/molecules/UploadAvatarForm'
import SubmitButton from '@/components/atoms/SubmitButton'

type ChangeProfileFormProps = {
  nickname: string
  image: string
}

const ChangeProfileForm = ({ nickname, image }: ChangeProfileFormProps) => {
  const [lastResult, action] = useFormState(changeProfileAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changeProfileSchema })
    },
  })

  // 成功時のメッセージ
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
          <FormControl isInvalid={!!fields.nickname.errors}>
            <FormLabel>表示名</FormLabel>
            <Input
              type='text'
              name={fields.nickname.name}
              placeholder="例：ボンボヤージュ太郎"
              defaultValue={nickname}
            />
            <FormErrorMessage>{fields.nickname.errors}</FormErrorMessage>
          </FormControl>
          <Text fontSize="xs" color="gray.500">*未設定時はユーザーIDが表示名となります。</Text>
        </Box>
        <UploadAvatarForm
          name={fields.image.name}
          errors={fields.image.errors}
          isRequired={true}
          prevImage={image}
        />
        <SubmitButton>変更を確定する</SubmitButton>
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
