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
  defaultValue?: string
  isRequired?: boolean
  errors: Array<string> | undefined
}

const InputWithLabel = ({
  label,
  type = 'text',
  name,
  placeholder,
  defaultValue = '',
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
            defaultValue={defaultValue}
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
            defaultValue={defaultValue}
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
