/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { getUserTokens } from '@/utils/getUserTokens'

export async function favoriteAction(
  souvenir_id: string,
  method: 'POST' | 'DELETE',
) {
  const tokens = await getUserTokens()
  if (!tokens) {
    return ['ログインしてください。']
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
    return data
  } catch (e) {
    return ['サーバーエラーが発生しました。']
  }
}
