import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import React from 'react'
import PasswordInput from '../atoms/PasswordInput'

type InputWithLabelProps = {
  label: string
  type?: 'text' | 'email' | 'password' | 'textarea'
  name: string
  placeholder: string
  isRequired?: boolean
  errors: Array<string> | undefined
  autoComplete?:
    | 'off'
    | 'on'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
}

const InputWithLabel = ({
  label,
  type = 'text',
  name,
  placeholder,
  isRequired = true,
  errors,
  autoComplete = 'on',
}: InputWithLabelProps) => {
  const inputType = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        )
      case 'password':
        return (
          <PasswordInput
            name={name}
            autoComplete={autoComplete as 'new-password' | 'current-password'}
          />
        )
      case 'textarea':
        return <Textarea name={name} placeholder={placeholder} />
      default:
        return (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        )
    }
  }
  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors}>
      <FormLabel>{label}</FormLabel>
      {inputType()}
      <FormErrorMessage>
        {errors?.map((error, index) => (
          <React.Fragment key={index}>
            {error}
            {index < errors.length - 1 && <br />}
          </React.Fragment>
        ))}
      </FormErrorMessage>
    </FormControl>
  )
}

export default InputWithLabel
