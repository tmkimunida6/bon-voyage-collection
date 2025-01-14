/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { CurrentUserType } from '@/types/types'

export async function fetchUserState() {
  let user: CurrentUserType = {
    alias_id: '',
    nickname: '',
    image: '',
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

    const data = await res.json()

    if (!res.ok) {
      return user
    }

    user = {
      ...data,
      isSignedIn: true,
    }
    return user
  } catch (error) {
    return user
  }
}
