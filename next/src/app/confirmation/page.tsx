'use client'

import { confirmUserAction } from '@/actions/confirmUserAction'
import type { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const Confirmation: NextPage = () => {
  const searchParams = useSearchParams()
  const confirmationToken = searchParams.get('confirmation_token')
  useEffect(() => {
    confirmUserAction(confirmationToken)
  }, [confirmationToken])
  return (
    <></>
  )
}

export default Confirmation
