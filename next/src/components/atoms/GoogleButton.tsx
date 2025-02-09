/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { favoriteBulkAction } from '@/actions/favoriteBulkAction'
import { setAccessTokenAction } from '@/actions/setAccessTokenAction'
import { fetchUserState } from '@/utils/fetchUserState'

type GoogleButtonProps = {
  children: ReactNode
}

export default function GoogleButton({ children }: GoogleButtonProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== process.env.NEXT_PUBLIC_FRONT_BASE_URL) return

      const data = event.data as
        | { accessToken: string; uid: string; expiry: string; client: string }
        | { status: string }

      // 今回はアクセストークンがあるかどうかで検知
      if ('accessToken' in data) {
        const { accessToken, uid, client } = data
        // アクセストークンがあればCookieなどに保存
        await setAccessTokenAction(accessToken, client, uid)
        setIsLoggedIn(true)
      }
    }
    window.addEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    // 認証をしたかどうか
    if (!isLoggedIn) return
    setLoading(true)

    const fetchUserData = async () => {
      try {
        const user = await fetchUserState()
        if (user.isSignedIn) {
          // おすすめのお土産を「欲しい」に一括追加
          const favoritedSouvenirsFromRecommend =
            localStorage.getItem('favoritedSouvenirs')
          console.log(favoritedSouvenirsFromRecommend)
          if (favoritedSouvenirsFromRecommend) {
            await favoriteBulkAction(
              JSON.parse(favoritedSouvenirsFromRecommend),
            )
          }

          toast({
            title: 'ログインに成功しました。',
            description: 'マイページに移動します。',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          router.push('/mypage')
        } else {
          toast({
            title: 'ログインに失敗しました。',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [isLoggedIn])

  // Googleログイン
  const handleGoogleLogin = () => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google_oauth2`
    form.target = 'GoogleLogin'

    const popup = window.open('', 'GoogleLogin', 'width=600,height=600')
    if (!popup) return

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    const intervalId = setInterval(() => {
      // 子ウィンドウが閉じたかどうか
      if (popup.closed) {
        // インターバルをクリア
        clearInterval(intervalId)
        // 認証が終了したとする
        setIsLoggedIn(true)
      }
    }, 1000)
  }

  return (
    <Button
      className="gsi-material-button"
      onClick={handleGoogleLogin}
      isLoading={loading}
      bg="white"
    >
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ display: 'block' }}
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span className="gsi-material-button-contents">{children}</span>
        <span style={{ display: 'none' }}>{children}</span>
      </div>
    </Button>
  )
}
