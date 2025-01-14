/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { revalidatePath } from 'next/cache'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { changePasswordSchema } from '@/schemas/userSchema'
import { getUserTokens } from '@/utils/getUserTokens'

export async function changePasswordAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: changePasswordSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply({
      formErrors: [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  const current_password = formData.get('current_password')
  const new_password = formData.get('new_password')
  const new_password_confirmation = formData.get('new_password_confirmation')

  const tokens = await getUserTokens()
  if (!tokens) {
    return submission.reply({
      formErrors: ['ログインしてください。'],
    })
  }

  try {
    const res = await fetch(`${apiBaseUrl}/auth`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      body: JSON.stringify({
        password: new_password,
        password_confirmation: new_password_confirmation,
        current_password,
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

    revalidatePath('/setting/email')
    return submission.reply()
  } catch (error: any) {
    return submission.reply({
      formErrors: error.message || [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }
}
