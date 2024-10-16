import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import PasswordInput from '../atoms/PasswordInput'

type InputWithLabelProps = {
  label: string
  type?: 'text' | 'email' | 'password'
  name: string
  placeholder: string
  errors: Array<string> | undefined
}

const InputWithLabel = ({
  label,
  type = 'text',
  name,
  placeholder,
  errors
}: InputWithLabelProps) => {
  return (
    <FormControl isRequired isInvalid={!!errors}>
      <FormLabel>{label}</FormLabel>
      {type === 'password' ? (
        <PasswordInput name={name} />
      ) : (
        <Input type={type} name={name} placeholder={placeholder} />
      )}
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  )
}

export default InputWithLabel
