'use client'

import { Alert, AlertDescription, AlertIcon, Stack } from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import SigninForm from './SigninForm'
import { signinAction } from '@/actions/signinAction'
import { signinSchema } from '@/schemas/userSchema'

type FormControllerProps = {
  formType: 'signin'
  submitText: string
}

const FormController = ({ formType, submitText }: FormControllerProps) => {
  const [lastResult, action] = useFormState(signinAction, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema })
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
        {formType === 'signin' && <SigninForm fields={fields} />}
        <SubmitButton>{submitText}</SubmitButton>
      </Stack>
    </form>
  )
}

export default FormController
