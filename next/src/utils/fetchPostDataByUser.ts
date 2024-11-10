/* eslint @typescript-eslint/no-unused-vars: 0 */

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchPostDataByUser() {
  const tokens = await getUserTokens()
  if (!tokens) {
    throw new Error('ログインしてください。')
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
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(
        data.errors.full_messages || 'サーバーエラーが発生しました。',
      )
    }

    return data
  } catch (e) {
    throw new Error(`Server error ${e}`)
  }
}
