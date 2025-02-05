'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from '../../atoms/SubmitButton'
import InputWithLabel from '../../molecules/InputWithLabel'
import { setAccessTokenAction } from '@/actions/setAccessTokenAction'
import { signinAction } from '@/actions/signinAction'
import TextIconLink from '@/components/molecules/TextIconLink'
import { signinSchema } from '@/schemas/userSchema'
import { fetchUserState } from '@/utils/fetchUserState'

const SigninForm = () => {
  const [lastResult, action] = useFormState(signinAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema })
    },
  })
  const router = useRouter()

  // 外部サービスログイン
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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

    const fetchUserData = async () => {
      const user = await fetchUserState()
      if (user.isSignedIn) {
        router.push('/mypage')
      }
    }
    fetchUserData()
  }, [isLoggedIn])

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
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      {form.errors && (
        <Alert status="error" my={4} borderRadius={4}>
          <AlertIcon />
          <AlertDescription>{form.errors[0]}</AlertDescription>
        </Alert>
      )}
      <Stack spacing={6}>
        <InputWithLabel
          label="メールアドレス"
          type="email"
          name={fields.email.name}
          placeholder="example@email.com"
          errors={fields.email.errors}
          autoComplete="email"
        />
        <Stack spacing={2}>
          <InputWithLabel
            label="パスワード"
            type="password"
            name={fields.password.name}
            placeholder="パスワードを入力してください"
            errors={fields.password.errors}
            autoComplete="current-password"
          />
          <Flex justifyContent="right">
            <TextIconLink
              iconName={'FaRegQuestionCircle'}
              iconPosition="left"
              href="/reset_password"
            >
              パスワードをお忘れの方
            </TextIconLink>
          </Flex>
        </Stack>
        <SubmitButton>ログイン</SubmitButton>
        <Button colorScheme="blue" onClick={handleGoogleLogin}>
          Googleでログイン
        </Button>
      </Stack>
    </form>
  )
}

export default SigninForm
