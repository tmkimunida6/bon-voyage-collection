/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomIcon from './CustomIcon'
import { signoutAction } from '@/actions/signoutAction'
import { useFavoriteStore } from '@/store/store'

const SignoutButton = () => {
  const [loading, setLoading] = useState(false)
  const { setFavoritedSouvenirs } = useFavoriteStore()
  const toast = useToast()
  const router = useRouter()

  const handleSignout = async () => {
    setFavoritedSouvenirs([])
    try {
      setLoading(true)
      await signoutAction()

      // おすすめのお土産の一時データをリセット
      localStorage.removeItem('favoritedSouvenirs')
      localStorage.removeItem('skipedSouvenirs')

      router.push('/sign_in')
    } catch (error: any) {
      toast({
        title: error.message,
        status: error.status,
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      gap="2px"
      onClick={handleSignout}
      isLoading={loading}
    >
      ログアウト
      <CustomIcon iconName="FaSignOutAlt" />
    </Button>
  )
}

export default SignoutButton
