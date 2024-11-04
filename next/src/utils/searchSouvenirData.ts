/* eslint @typescript-eslint/no-unused-vars: 0 */
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function searchSouvenirData(word: string, category_id: string) {
  try {
    const res = await fetch(
      `${apiBaseUrl}/souvenirs?name_or_description_cont=${word}&category_id_eq=${category_id}`,
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
      throw new Error(
        data.errors.full_messages || 'サーバーエラーが発生しました。',
      )
    }

    return data
  } catch (e) {
    throw new Error('サーバーエラーが発生しました。')
  }
}
