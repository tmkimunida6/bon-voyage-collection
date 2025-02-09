/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomIcon from './CustomIcon'
import { signoutAction } from '@/actions/signoutAction'
import { useFavoriteStore } from '@/store/index'

type SignoutButtonProps = {
  size: 'sm' | 'md'
  variant: 'outline' | 'danger'
}

const SignoutButton = ({ size, variant }: SignoutButtonProps) => {
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
      localStorage.removeItem('selectedCurrency')

      toast({
        title: 'ログアウトしました。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      await router.push('/sign_in')
      router.refresh()
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
      size={size}
      variant={variant === 'outline' ? variant : 'solid'}
      colorScheme={variant === 'danger' ? 'red' : ''}
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
