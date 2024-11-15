/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { getUserTokens } from '@/utils/getUserTokens'

export async function favoriteAction(
  souvenir_id: string,
  method: 'POST' | 'DELETE',
) {
  const tokens = await getUserTokens()
  if (!tokens) {
    throw new Error('ログインしてください。')
  }

  try {
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
      throw new Error(data.message || 'サーバーエラーが発生しました。')
    }
    return data
  } catch (e: any) {
    throw new Error(e.message || 'サーバーエラーが発生しました。')
  }
}
