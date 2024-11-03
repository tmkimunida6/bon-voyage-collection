/* eslint @typescript-eslint/no-unused-vars: 0 */

import { cookies } from 'next/headers'

export async function getUserTokens() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access-token')?.value as string
  const client = cookieStore.get('client')?.value as string
  const uid = cookieStore.get('uid')?.value as string

  if (!accessToken || !client || !uid) {
    return null
  }

  return { accessToken, client, uid }
}
