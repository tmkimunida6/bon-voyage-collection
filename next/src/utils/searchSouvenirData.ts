/* eslint @typescript-eslint/no-unused-vars: 0 */
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function searchSouvenirData(word: string) {
  if (!word) return

  try {
    const res = await fetch(
      `${apiBaseUrl}/souvenirs?name_or_description_cont=${word}`,
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
