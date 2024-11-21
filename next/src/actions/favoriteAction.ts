/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { getUserTokens } from '@/utils/getUserTokens'

export async function favoriteAction(
  souvenir_id: string,
  method: 'POST' | 'DELETE',
) {
  try {
    const tokens = await getUserTokens()
    if (!tokens) {
      throw new Error('ログインしてください。')
    }

    // DBにデータ送信
    const res = await fetch(
      `${apiBaseUrl}/souvenirs/${souvenir_id}/favorites`,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'access-token': tokens.accessToken,
          client: tokens.client,
          uid: tokens.uid,
        },
      },
    )

    const data = await res.json()
    if (!res.ok) {
      throw new Error(
        data.message || 'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      )
    }
    return data
  } catch (error: any) {
    return { status: 'error', message: error.message }
  }
}
