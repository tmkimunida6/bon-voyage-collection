/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { setAccessTokenAction } from './setAccessTokenAction'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { fetchUserState } from '@/utils/fetchUserState'
import { signoutAction } from './signoutAction'
import { UserRequestType } from '@/types/types'

type ConfirmUserActionResult = {
  message: string
  status: 'error' | 'info' | 'warning' | 'success' | 'loading'
}

export async function confirmUserAction(
  confirmationToken: string,
  requestAction: UserRequestType
): Promise<ConfirmUserActionResult> {
  const user = await fetchUserState()

  // トークンなしの場合
  if (!confirmationToken || !requestAction) {
    return { message: 'URLが有効ではありません。', status: 'error' }
  }

  // ログイン済みの場合
  if (user.isSignedIn && requestAction === 'registration') {
    return {
      message:
        'すでに別のアカウントでログイン済みです。ログアウトしてから再度アクセスしてください。',
      status: 'error',
    }
  }

  try {
    const res = await fetch(`${apiBaseUrl}/user/confirmations`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmation_token: confirmationToken,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return { message: data.message, status: 'error' }
    }

    // ユーザー登録時は自動ログイン（それ以外はログアウト）
    if(requestAction === 'registration') {
      const accessToken = data.access_token
      const client = data.client
      const uid = data.uid

      if (accessToken && client && uid) {
        await setAccessTokenAction(accessToken, client, uid)
      } else {
        return {
          message:
            'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
          status: 'error',
        }
      }
    } else {
      if(user.isSignedIn) {
        await signoutAction()
      }
    }

    return { message: data.message, status: 'success' }
  } catch (error: any) {
    return {
      message:
        error.message ||
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      status: 'error',
    }
  }
}
