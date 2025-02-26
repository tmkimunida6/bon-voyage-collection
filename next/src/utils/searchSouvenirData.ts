/* eslint @typescript-eslint/no-unused-vars: 0 */
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function searchSouvenirData(
  currentPage: number,
  word: string,
  category_id: string,
) {
  try {
    const res = await fetch(
      `${apiBaseUrl}/souvenirs?page=${currentPage}&name_or_description_cont=${word}&category_id_eq=${category_id}`,
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
      throw new Error()
    }

    return data
  } catch (e) {
    throw new Error()
  }
}
