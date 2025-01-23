/* eslint react-hooks/exhaustive-deps: 0 */

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
import { redirect } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { changeProfileAction } from '@/actions/changeProfileAction'
import SubmitButton from '@/components/atoms/SubmitButton'
import UploadAvatarForm from '@/components/molecules/UploadAvatarForm'
import { changeProfileSchema } from '@/schemas/userSchema'

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
  const [editing, setEditing] = useState(false)
  const [nicknameChanged, setNicknameChanged] = useState(false)
  const [imageChanged, setImageChanged] = useState(false)
  const isInitialRender = useRef(true)

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

  // 入力に変更があった場合のみ変更ボタンを活性化
  useEffect(() => {
    // 初期表示時は何もしない
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    // 編集開始フラグ
    if (!editing) {
      setEditing(true)
    }
  }, [nicknameChanged, imageChanged])

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
              type="text"
              name={fields.nickname.name}
              placeholder="例：ボンボヤージュ太郎"
              defaultValue={nickname}
              onChange={() => !nicknameChanged && setNicknameChanged(true)}
            />
            <FormErrorMessage>{fields.nickname.errors}</FormErrorMessage>
          </FormControl>
          <Text fontSize="xs" color="gray.500">
            *未設定時はユーザーIDが表示名となります。
          </Text>
        </Box>
        <UploadAvatarForm
          name={fields.image.name}
          errors={fields.image.errors}
          isRequired={true}
          prevImage={image}
          imageChanged={imageChanged}
          setImageChanged={setImageChanged}
        />
        <SubmitButton disabled={!editing}>変更を確定する</SubmitButton>
      </Stack>
    </form>
  )
}

export default ChangeProfileForm
