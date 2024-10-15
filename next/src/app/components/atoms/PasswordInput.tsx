'use client'

import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import CustomIcon from './CustomIcon'

const PasswordInput = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr={10}
        type={show ? 'text' : 'password'}
        placeholder="パスワードを入力"
      />
      <InputRightElement>
        <Button variant="ghost" onClick={handleClick}>
          <CustomIcon iconName={show ? 'FaEyeSlash' : 'FaEye'} />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
