'use server'

import { cookies } from 'next/headers'

export async function signoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete('access-token')
  cookieStore.delete('client')
  cookieStore.delete('uid')
}
