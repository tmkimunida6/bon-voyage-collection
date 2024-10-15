import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import PasswordInput from '../atoms/PasswordInput'

type InputWithLabelProps = {
  label: string
  type?: 'text' | 'email' | 'password'
  name: string
  placeholder: string
}

const InputWithLabel = ({
  label,
  type = 'text',
  name,
  placeholder,
}: InputWithLabelProps) => {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      {type === 'password' ? (
        <PasswordInput name={name} />
      ) : (
        <Input type={type} name={name} placeholder={placeholder} />
      )}
    </FormControl>
  )
}

export default InputWithLabel
