/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { revalidatePath } from 'next/cache'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { changeEmailSchema } from '@/schemas/userSchema'
import { getUserTokens } from '@/utils/getUserTokens'

export async function changeEmailAction(
  prevState: unknown,
  formData: FormData,
) {
  const currentEmail = formData.get('current_email') as string
  const submission = parseWithZod(formData, {
    schema: changeEmailSchema(currentEmail),
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const new_email = formData.get('new_email')
  const current_password = formData.get('current_password')

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
        email: new_email,
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
