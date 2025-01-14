/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { cookies } from 'next/headers'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { getUserTokens } from '@/utils/getUserTokens'

export async function signoutAction() {
  try {
    const tokens = await getUserTokens()
    if (!tokens) {
      throw new Error('ログインしていません。')
    }

    // DBにデータ送信
    const res = await fetch(`${apiBaseUrl}/auth/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(
        data.message ||
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      )
    }

    // クッキーから削除
    const cookieStore = await cookies()
    cookieStore.delete('access-token')
    cookieStore.delete('client')
    cookieStore.delete('uid')

    return
  } catch (error: any) {
    return { status: 'error', message: error.message }
  }
}
