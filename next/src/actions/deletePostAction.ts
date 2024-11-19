/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { getUserTokens } from '@/utils/getUserTokens'

export async function deletePostAction(post_id: string) {
  const tokens = await getUserTokens()
  if (!tokens) {
    throw new Error('ログインしてください。')
  }

  try {
    // DBにデータ送信
    const res = await fetch(`${apiBaseUrl}/posts/${post_id}`, {
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
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      )
    }
    return data
  } catch (error) {
    throw new Error(
      'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
    )
  }
}
