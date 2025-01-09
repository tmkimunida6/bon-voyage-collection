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
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import { signinAction } from '@/actions/signinAction'
import InputWithLabel from '@/components/molecules/InputWithLabel'
import TextIconLink from '@/components/molecules/TextIconLink'
import { changeProfileSchema } from '@/schemas/userSchema'
import UploadImageForm from '@/components/molecules/UploadImageForm'

type ChangeProfileFormProps = {
  user_id: string
}

const ChangeProfileForm = ({ user_id }: ChangeProfileFormProps) => {
  const [lastResult, action] = useFormState(signinAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changeProfileSchema })
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
        <Box>
          <InputWithLabel
            label="表示名"
            type="text"
            name={fields.user_name.name}
            placeholder="例：ボンボヤージュ太郎"
            errors={fields.user_name.errors}
            isRequired={false}
          />
          <Text fontSize="xs" color="gray.500">*未設定時はユーザーIDが表示名となります。</Text>
        </Box>
        <InputWithLabel
          label="ユーザーID"
          type="text"
          name={fields.user_id.name}
          placeholder="半角英数字で入力"
          defaultValue={user_id}
          errors={fields.user_id.errors}
        />
        <UploadImageForm
          name={fields.avatar.name}
          errors={fields.avatar.errors}
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
