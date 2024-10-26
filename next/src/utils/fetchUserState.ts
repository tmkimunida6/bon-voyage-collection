import { cookies } from 'next/headers'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { userType } from '@/app/types/types'

export async function fetchUserState() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access-token')?.value
  const client = cookieStore.get('client')?.value
  const uid = cookieStore.get('uid')?.value
  let user:userType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
  }

  if (!accessToken || !client || !uid) {
    return user;
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
      isSignedIn: true
    }
    return user
  } catch (error) {
    throw new Error('Server error')
  }
}
