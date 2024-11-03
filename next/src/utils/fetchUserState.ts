/* eslint @typescript-eslint/no-unused-vars: 0 */

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { UserType } from '@/types/types'

export async function fetchUserState() {
  let user: UserType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
  }
  const tokens = await getUserTokens()
  if (!tokens) return user

  try {
    const res = await fetch(`${apiBaseUrl}/current/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
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
