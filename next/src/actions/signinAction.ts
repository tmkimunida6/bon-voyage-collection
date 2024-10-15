'use server'
import { redirect } from 'next/navigation'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { cookies } from 'next/headers'

export async function signinAction(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  if (!email || !password) {
    console.log('Email or password is missing')
    return
  }

  try {
    const res = await fetch(`${apiBaseUrl}/auth/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      console.log('Failed to sign in')
      return
    }

    const accessToken = res.headers.get('access-token')
    const client = res.headers.get('client')
    const uid = res.headers.get('uid')

    if (accessToken && client && uid) {
      cookies().set('access-token', accessToken, { httpOnly: true, secure: false })
      cookies().set('client', client, { httpOnly: true, secure: false })
      cookies().set('uid', uid, { httpOnly: true, secure: false })
    } else {
      console.log('Missing authentication headers')
      return
    }
  } catch (e) {
    console.log((e as Error).message)
    return
  }

  redirect('/')
}