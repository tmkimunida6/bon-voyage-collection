/* eslint @typescript-eslint/no-unused-vars: 0 */

import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchPostDataBySouvenir(
  souvenir_id: string,
  page: number = 1,
  user_id: string = '',
) {
  try {
    const res = await fetch(
      `${apiBaseUrl}/posts/by_souvenir/${souvenir_id}?page=${page}&&user_id=${user_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error('サーバーエラーが発生しました。時間をおいてから再度お試しください。' )
    }

    return data
  } catch (error) {
    throw new Error('サーバーエラーが発生しました。時間をおいてから再度お試しください。' )
  }
}
