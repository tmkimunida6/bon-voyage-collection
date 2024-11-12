/* eslint @typescript-eslint/no-unused-vars: 0 */

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchFavoritedSouvenirs() {
  const tokens = await getUserTokens()
  if (!tokens) {
    return {}
  }

  try {
    const res = await fetch(
      `${apiBaseUrl}/souvenirs/favorited_index`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': tokens.accessToken,
          client: tokens.client,
          uid: tokens.uid,
        },
        cache: 'no-store',
      },
    )

    const data = await res.json()
    if (!res.ok) {
      throw new Error(
        data.errors.full_messages || 'サーバーエラーが発生しました。',
      )
    }

    return data
  } catch (e) {
    throw new Error('サーバーエラーが発生しました。')
  }
}
