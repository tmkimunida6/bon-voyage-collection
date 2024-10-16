'use client'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  children: ReactNode
}

const SubmitButton = ({ children }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <ButtonGroup justifyContent="center">
      <Button type="submit" variant="primary" isLoading={pending}>
        {children}
      </Button>
    </ButtonGroup>
  )
}

export default SubmitButton
