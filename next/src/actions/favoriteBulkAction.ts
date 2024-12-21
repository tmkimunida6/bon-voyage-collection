/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { revalidatePath } from 'next/cache'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { getUserTokens } from '@/utils/getUserTokens'

export async function favoriteBulkAction(
  souvenir_ids: Array<string>,
) {
  try {
    const tokens = await getUserTokens()
    if (!tokens) {
      throw new Error('ログインしてください。')
    }

    // DBにデータ送信
    const res = await fetch(`${apiBaseUrl}/souvenirs/favorites/bulk_create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      body: JSON.stringify({ souvenir_ids }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(
        data.message ||
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      )
    }
    revalidatePath('/mypage')
    return data
  } catch (error: any) {
    return { status: 'error', message: error.message }
  }
}
