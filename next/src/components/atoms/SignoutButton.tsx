'use client'

import { Button } from '@chakra-ui/react'
import CustomIcon from './CustomIcon'
import { signoutAction } from '@/actions/signoutAction'
import { useFavoriteStore } from '@/store/store'

const SignoutButton = () => {
  const { setFavoritedSouvenirs } = useFavoriteStore()
  const handleSignout = () => {
    setFavoritedSouvenirs([])
    signoutAction()

    // おすすめのお土産の一時データをリセット
    localStorage.removeItem('favoritedSouvenirs')
    localStorage.removeItem('skipedSouvenirs')
  }

  return (
    <Button size="sm" variant="outline" gap="2px" onClick={handleSignout}>
      ログアウト
      <CustomIcon iconName="FaSignOutAlt" />
    </Button>
  )
}

export default SignoutButton
