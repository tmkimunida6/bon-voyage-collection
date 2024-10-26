'use server'

import { parseWithZod } from '@conform-to/zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { registerSchema } from '@/schemas/userSchema'

export async function registerAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: registerSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const email = formData.get('email')
  const password = formData.get('password')
  const password_confirmation = formData.get('password_confirmation')
  const confirm_success_url = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/sign_in`
  try {
    const res = await fetch(`${apiBaseUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, password_confirmation, confirm_success_url }),
    })

    if (!res.ok) {
      if (res.status === 401) {
        return submission.reply({
          formErrors: ['無効なメールアドレスまたはパスワードです。'],
        })
      } else {
        return submission.reply({
          formErrors: ['サーバーエラーが発生しました。'],
        })
      }
    }

    const accessToken = res.headers.get('access-token')
    const client = res.headers.get('client')
    const uid = res.headers.get('uid')

    if (accessToken && client && uid) {
      cookies().set('access-token', accessToken, {
        httpOnly: true,
        secure: false,
      })
      cookies().set('client', client, { httpOnly: true, secure: false })
      cookies().set('uid', uid, { httpOnly: true, secure: false })
    } else {
      return submission.reply({
        formErrors: ['ログインに失敗しました。'],
      })
    }
  } catch (e) {
    return submission.reply({
      formErrors: ['サーバーエラーが発生しました。'],
    })
  }

  redirect('/top')
}
