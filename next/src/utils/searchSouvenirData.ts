/* eslint @typescript-eslint/no-unused-vars: 0 */
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function searchSouvenirData(
  word: string,
  category_id: number | '',
) {
  if (!word && !category_id) return

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
    console.log(data)
    if (!res.ok) {
      return null
    }

    return data
  } catch (e) {
    return null
  }
}
