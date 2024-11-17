/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { setAccessTokenAction } from './setAccessTokenAction'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { fetchUserState } from '@/utils/fetchUserState'

type ConfirmUserActionResult = {
  message: string
  status: 'error' | 'info' | 'warning' | 'success' | 'loading'
}

export async function confirmUserAction(
  confirmationToken: string,
): Promise<ConfirmUserActionResult> {
  const endpoint = `${apiBaseUrl}/user/confirmations`

  const user = await fetchUserState()

  // トークンなしの場合
  if (!confirmationToken) {
    return { message: 'URLが有効ではありません。', status: 'error' }
  }

  // ログイン済みの場合
  if (user.isSignedIn) {
    return { message: 'すでに別のアカウントでログイン済みです。ログアウトしてから再度アクセスしてください。', status: 'error' }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmation_token: confirmationToken }),
    })
    const data = await res.json()

    if (!res.ok) {
      const message = data.message
      return { message, status: 'error' }
    }

    const accessToken = data.access_token
    const client = data.client
    const uid = data.uid

    if (accessToken && client && uid) {
      setAccessTokenAction(accessToken, client, uid)
      return {message: 'ユーザー認証に成功しました。', status: 'error' }
    } else {
      return {
        message: 'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
        status: 'error',
      }
    }
  } catch (error) {
    return {
      message: 'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      status: 'error'
    }
  }
}
