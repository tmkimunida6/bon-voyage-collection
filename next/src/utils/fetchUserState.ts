/* eslint @typescript-eslint/no-unused-vars: 0 */

import { cookies } from 'next/headers'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { UserType } from '@/types/types'

export async function fetchUserState() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access-token')?.value
  const client = cookieStore.get('client')?.value
  const uid = cookieStore.get('uid')?.value
  let user: UserType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
  }

  if (!accessToken || !client || !uid) {
    return user
  }

  try {
    const res = await fetch(`${apiBaseUrl}/current/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
        client: client,
        uid: uid,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to validate token')
    }

    const userData = await res.json()
    user = {
      ...userData,
      isSignedIn: true,
    }
    return user
  } catch (e) {
    throw new Error(`Server error${e}`)
  }
}
