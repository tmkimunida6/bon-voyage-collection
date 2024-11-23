/* eslint @typescript-eslint/no-unused-vars: 0 */

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchPostDataByUser() {
  const tokens = await getUserTokens()
  if (!tokens) {
    return []
  }

  try {
    const res = await fetch(`${apiBaseUrl}/current/user/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      cache: 'no-store',
    })

    const data = await res.json()

    if (!res.ok) {
      return []
    }

    return data
  } catch (error) {
    return []
  }
}
