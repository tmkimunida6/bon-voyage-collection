/* eslint @typescript-eslint/no-unused-vars: 0 */

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchRecommendSouvenirs(
  word: string,
  category_id: string,
) {
  const tokens = await getUserTokens()

  try {
    const res = await fetch(
      `${apiBaseUrl}/souvenirs/recommend?name_or_description_cont=${word}&category_id_eq=${category_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': tokens?.accessToken || '',
          client: tokens?.client || '',
          uid: tokens?.uid || '',
        },
        cache: 'no-store',
      },
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error()
    }

    return data
  } catch (e) {
    throw new Error()
  }
}
