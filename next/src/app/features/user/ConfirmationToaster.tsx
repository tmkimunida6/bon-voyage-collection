'use client'

import { useToast } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

type ToastDataType = {
  message: string
  status: 'error' | 'info' | 'warning' | 'success' | 'loading'
}

const ConfirmationToaster = ({ message, status }: ToastDataType) => {
  const toast = useToast()

  useEffect(() => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    })

    redirect('/')
  }, [toast, message, status])

  return null
}

export default ConfirmationToaster
