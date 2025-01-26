'use server'

import { cookies } from 'next/headers'

export async function setAccessTokenAction(
  accessToken: string,
  client: string,
  uid: string,
) {
  const cookieStore = await cookies()
  cookieStore.set('access-token', accessToken, {
    httpOnly: true,
    secure: true,
  })
  cookieStore.set('client', client, { httpOnly: true, secure: true })
  cookieStore.set('uid', uid, { httpOnly: true, secure: true })
}
