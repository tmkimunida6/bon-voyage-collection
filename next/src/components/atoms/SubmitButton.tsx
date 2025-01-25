'use client'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  children: ReactNode
  disabled?: boolean
}

const SubmitButton = ({ children, disabled = false }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <ButtonGroup justifyContent="center">
      <Button
        type="submit"
        variant="primary"
        isLoading={pending}
        disabled={disabled || pending}
        aria-disabled={disabled}
      >
        {children}
      </Button>
    </ButtonGroup>
  )
}

export default SubmitButton
