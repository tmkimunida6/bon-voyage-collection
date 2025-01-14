/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { resetPasswordRequestSchema } from '@/schemas/userSchema'

export async function resetPasswordRequestAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: resetPasswordRequestSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply({
      formErrors: [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  const email = formData.get('email')
  const redirect_url = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/reset_password/new`

  try {
    const res = await fetch(`${apiBaseUrl}/auth/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        redirect_url,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return submission.reply({
        formErrors: data.errors.full_messages || [
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
        ],
      })
    }

    return submission.reply()
  } catch (error: any) {
    return submission.reply({
      formErrors: error.message || [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }
}
