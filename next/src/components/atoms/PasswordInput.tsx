'use client'

import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import CustomIcon from './CustomIcon'

type PasswordInputProps = {
  name: string
  autoComplete: 'new-password' | 'current-password'
}

const PasswordInput = ({ name, autoComplete }: PasswordInputProps) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr={10}
        type={show ? 'text' : 'password'}
        name={name}
        placeholder="パスワードを入力"
        autoComplete={autoComplete}
      />
      <InputRightElement>
        <Button variant="ghost" onClick={handleClick}>
          <CustomIcon iconName={show ? 'FaEye' : 'FaEyeSlash'} />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
