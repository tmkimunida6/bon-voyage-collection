'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete('access-token')
  cookieStore.delete('client')
  cookieStore.delete('uid')

  redirect('/')
}
