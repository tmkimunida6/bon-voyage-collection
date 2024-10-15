import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import PasswordInput from '../atoms/PasswordInput'

type InputWithLabelProps = {
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder: string
}

const InputWithLabel = ({
  label,
  type = 'text',
  placeholder,
}: InputWithLabelProps) => {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      {type === 'password' ? (
        <PasswordInput />
      ) : (
        <Input type={type} placeholder={placeholder} />
      )}
    </FormControl>
  )
}

export default InputWithLabel
