/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { resetPasswordSchema } from '@/schemas/userSchema'

export async function resetPasswordAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: resetPasswordSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply({
      formErrors: [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  const reset_password_token = formData.get('reset_password_token')
  const password = formData.get('password')
  const password_confirmation = formData.get('password_confirmation')

  try {
    const res = await fetch(`${apiBaseUrl}/auth/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reset_password_token,
        password,
        password_confirmation,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return submission.reply({
        formErrors: data.errors || data.errors.full_messages || [
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
