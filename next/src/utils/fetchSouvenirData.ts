/* eslint @typescript-eslint/no-unused-vars: 0 */

import { redirect } from 'next/navigation'
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchSouvenirData(id: string) {
  try {
    const res = await fetch(`${apiBaseUrl}/souvenirs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (!res.ok) {
      redirect('/404')
    }
    return data
  } catch (e) {
    redirect('/404')
  }
}
