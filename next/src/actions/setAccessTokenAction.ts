'use server'

import { cookies } from "next/headers";

export const setAccessTokenAction = (accessToken: string, client: string, uid: string) => {
  cookies().set('access-token', accessToken, { httpOnly: true, secure: false })
  cookies().set('client', client, { httpOnly: true, secure: false })
  cookies().set('uid', uid, { httpOnly: true, secure: false })
}