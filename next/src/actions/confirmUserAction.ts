'use server'

import { apiBaseUrl } from "@/constants/apiBaseUrl"
import { fetchUserState } from "@/utils/fetchUserState"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function confirmUserAction(confirmationToken: string | null) {
  const endpoint = `${apiBaseUrl}/user/confirmations`

  const user = await fetchUserState()

  if(!confirmationToken || user.isSignedIn) {
    return redirect('/')
  }

  try {
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmation_token: confirmationToken }),
    })

    if(!res.ok) {
      return;
    }
    const data = await res.json()
    const accessToken =data.access_token
    const client =data.client
    const uid =data.uid

    if (accessToken && client && uid) {
      cookies().set('access-token', accessToken, {
        httpOnly: true,
        secure: false,
      })
      cookies().set('client', client, { httpOnly: true, secure: false })
      cookies().set('uid', uid, { httpOnly: true, secure: false })
    } else {
      return;
    }
  } catch(error: any) {
    console.log(error.message)
    return;
  }

  return redirect('/')
}