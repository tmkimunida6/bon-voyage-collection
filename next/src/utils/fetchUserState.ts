/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { UserType } from '@/types/types'

export async function fetchUserState() {
  let user: UserType = {
    alias_id: '',
    name: '',
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
