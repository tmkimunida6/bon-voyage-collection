import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import PasswordInput from '../atoms/PasswordInput'

type InputWithLabelProps = {
  label: string
  type?: 'text' | 'email' | 'password' | 'textarea'
  name: string
  placeholder: string
  isRequired?: boolean
  errors: Array<string> | undefined
}

const InputWithLabel = ({
  label,
  type = 'text',
  name,
  placeholder,
  isRequired = true,
  errors,
}: InputWithLabelProps) => {
  const inputType = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
          />
        )
      case 'password':
        return <PasswordInput name={name} />
      case 'textarea':
        return <Textarea name={name} placeholder={placeholder} />
      default:
        return (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
          />
        )
    }
  }
  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors}>
      <FormLabel>{label}</FormLabel>
      {inputType()}
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  )
}

export default InputWithLabel
