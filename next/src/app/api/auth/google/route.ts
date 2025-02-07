import { NextResponse } from 'next/server'

export async function POST() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/user/omniauth_callbacks'

  // Send a POST request to the API
  const response = await fetch(apiUrl)

  // Handle the response
  if (response.ok) {
    // 成功時のリダイレクト
    return NextResponse.redirect(response.url)
  } else {
    // エラーハンドリング
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: response.status },
    )
  }
}
