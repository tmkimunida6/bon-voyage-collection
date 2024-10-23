import { apiBaseUrl } from '@/constants/apiBaseUrl'

export const fetcher = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: object,
) => {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error('サーバーエラーが発生しました。')
  }

  return response
}
