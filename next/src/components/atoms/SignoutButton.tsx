'use client'

import { Button } from '@chakra-ui/react'
import CustomIcon from './CustomIcon'
import { signoutAction } from '@/actions/signoutAction'

const signoutButton = () => {
  const handleSignout = () => signoutAction()

  return (
    <Button size="sm" variant="outline" gap="2px" onClick={handleSignout}>
      ログアウト
      <CustomIcon iconName="FaSignInAlt" />
    </Button>
  )
}

export default signoutButton
