/* eslint @typescript-eslint/no-unused-vars: 0 */

import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchCategories() {
  try {
    const res = await fetch(`${apiBaseUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error()
    }

    return data
  } catch (error) {
    throw new Error()
  }
}
