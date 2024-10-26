'use server'

import { apiBaseUrl } from "@/constants/apiBaseUrl"
import { fetchUserState } from "@/utils/fetchUserState"
import { setAccessTokenAction } from "./setAccessTokenAction"

type ConfirmUserActionResult = {
  status: "error" | "info" | "warning" | "success" | "loading"
  message: string
}

export async function confirmUserAction(confirmationToken: string | null): Promise<ConfirmUserActionResult> {
  const endpoint = `${apiBaseUrl}/user/confirmations`

  const user = await fetchUserState()

  if(!confirmationToken) return { status: 'error', message: 'URLが有効ではありません。' }
  if(user.isSignedIn) return { status: 'error', message: 'すでに別のアカウントでログイン済みです。ログアウトしてから再度アクセスしてください。' }

  try {
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmation_token: confirmationToken }),
    })
    const data = await res.json()

    if(!res.ok) {
      const message = data.message
      return { status: 'error', message }
    }

    const accessToken = data.access_token
    const client = data.client
    const uid = data.uid

    if (accessToken && client && uid) {
      setAccessTokenAction(accessToken, client, uid)
      return { status: 'success', message: 'ユーザー認証に成功しました。' }
    } else {
      return { status: 'error', message: 'サーバーエラーが発生しました。時間をおいてから再度お試しください。' }
    }

  } catch(error: any) {
    return { status: 'error', message: 'サーバーエラーが発生しました。時間をおいてから再度お試しください。' }
  }
}