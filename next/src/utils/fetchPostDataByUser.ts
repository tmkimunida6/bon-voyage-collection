/* eslint @typescript-eslint/no-unused-vars: 0 */

import { redirect } from 'next/navigation'
import { getUserTokens } from './getUserTokens'
import { apiBaseUrl } from '@/constants/apiBaseUrl'

export async function fetchPostDataByUser() {
  const tokens = await getUserTokens()
  if (!tokens) {
    redirect('/sign_in?status=login_required')
  }

  try {
    const res = await fetch(`${apiBaseUrl}/current/user/posts`, {
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
      redirect('/?status=server_error')
    }

    return data
  } catch (error) {
    redirect('/?status=server_error')
  }
}
