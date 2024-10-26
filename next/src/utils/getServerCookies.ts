'use server'

import { cookies } from 'next/headers'

export default async function getServerCookies() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access-token')
  const client = cookieStore.get('client')
  const uid = cookieStore.get('uid')

  return {
    cookies: {
      accessToken,
      client,
      uid,
    },
  }
}
