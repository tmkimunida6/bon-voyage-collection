/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchFavoritedStatus(souvenir_id: string) {
  const tokens = await getUserTokens()
  if (!tokens) {
    return { favorited: false }
  }

  try {
    const res = await fetch(
      `${apiBaseUrl}/souvenirs/${souvenir_id}/favorited_status`,
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
      return { favorited: false }
    }

    return data
  } catch (e) {
    return { favorited: false }
  }
}
