/* eslint @typescript-eslint/no-unused-vars: 0 */

import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchPostDataAll(page: number) {
  try {
    const res = await fetch(`${apiBaseUrl}/posts/?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: "no-store",
    })

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
