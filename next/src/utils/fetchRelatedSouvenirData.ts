/* eslint @typescript-eslint/no-unused-vars: 0 */

import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchRelatedSouvenirData(id: number) {
  try {
    const res = await fetch(`${apiBaseUrl}/souvenirs/${id}/related`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (!res.ok) {
      return null
    }

    return data
  } catch (e) {
    return null
  }
}
