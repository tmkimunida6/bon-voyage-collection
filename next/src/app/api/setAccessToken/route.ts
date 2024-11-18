import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, client, uid } = await request.json();
  console.log(accessToken, client, uid)

  const response = NextResponse.json({ message: 'ユーザー認証に成功しました。' });
  response.cookies.set('access-token', accessToken, { httpOnly: true, secure: false })
  response.cookies.set('client', client, { httpOnly: true, secure: false })
  response.cookies.set('uid', uid, { httpOnly: true, secure: false })

  return response
}