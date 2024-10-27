'use server'

import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { signinSchema } from '@/schemas/userSchema'
import { setAccessTokenAction } from './setAccessTokenAction'

export async function signinAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signinSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const email = formData.get('email')
  const password = formData.get('password')
  try {
    const res = await fetch(`${apiBaseUrl}/auth/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json();
    if (!res.ok) {
      return submission.reply({
        formErrors: data.errors.full_messages || data.errors || ['サーバーエラーが発生しました。'],
      })
    }

    const accessToken = res.headers.get('access-token')
    const client = res.headers.get('client')
    const uid = res.headers.get('uid')

    if (accessToken && client && uid) {
      setAccessTokenAction(accessToken, client, uid)
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
