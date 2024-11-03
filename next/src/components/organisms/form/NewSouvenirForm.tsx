'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { createSouvenirAction } from '@/actions/createSouvenirAction'
import CategoryInput from '@/app/features/category/CategoryInput'
import { newSouvenirSchema } from '@/schemas/souvenirSchema'

const NewSouvenirForm = () => {
  const [lastResult, action] = useFormState(createSouvenirAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: newSouvenirSchema })
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
          label="お土産の名称"
          type="text"
          name={fields.souvenir_name.name}
          placeholder="お土産の名称を入力"
          errors={fields.souvenir_name.errors}
        />
        <FormControl isRequired isInvalid={!!fields.category_name.errors}>
          <FormLabel>カテゴリー</FormLabel>
          <CategoryInput errors={fields.category_name.errors} />
        </FormControl>
        <InputWithLabel
          label="説明"
          type="textarea"
          name={fields.souvenir_description.name}
          placeholder="お土産に関する説明を記載してください。"
          errors={fields.souvenir_description.errors}
          isRequired={false}
        />
        <SubmitButton>登録する</SubmitButton>
      </Stack>
    </form>
  )
}

export default NewSouvenirForm
