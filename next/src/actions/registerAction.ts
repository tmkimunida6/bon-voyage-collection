/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { registerSchema } from '@/schemas/userSchema'

export async function registerAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: registerSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply({
      formErrors: [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  const email = formData.get('email')
  const password = formData.get('password')
  const password_confirmation = formData.get('password_confirmation')
  const confirm_success_url = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/sign_in`
  try {
    const res = await fetch(`${apiBaseUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation,
        confirm_success_url,
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
  } catch (error: any) {
    return submission.reply({
      formErrors: error.message || [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  redirect('/register/temporary')
}
