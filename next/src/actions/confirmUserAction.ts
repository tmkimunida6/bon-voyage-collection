'use server'

import { apiBaseUrl } from "@/constants/apiBaseUrl"
import { fetchUserState } from "@/utils/fetchUserState"
import { redirect } from "next/navigation"

export async function confirmUserAction(confirmationToken: string | null) {
  const endpoint = `${apiBaseUrl}/user/confirmations`

  const user = await fetchUserState()

  if(!confirmationToken || user.isSignedIn) {
    return redirect('/')
  }

  let redirectTo = '/sign_in'

  try {
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmation_token: confirmationToken }),
    })

    if (!res.ok) {
      redirectTo = '/'
    }
  } catch(e) {
    console.log(e.message)
    redirectTo = '/'
  }

  return redirect(redirectTo)
}