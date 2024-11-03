/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { newSouvenirSchema } from '@/schemas/souvenirSchema'
import { getUserTokens } from '@/utils/getUserTokens'

export async function createSouvenirAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: newSouvenirSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const name = formData.get('souvenir_name')
  const category_id = formData.get('category_id')
  const description = formData.get('souvenir_description')

  const tokens = await getUserTokens()
  if (!tokens) {
    return submission.reply({
      formErrors: ['ログインしてください。'],
    })
  }

  try {
    const res = await fetch(`${apiBaseUrl}/souvenirs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      body: JSON.stringify({ name, category_id, description }),
    })

    const data = await res.json()
    if (!res.ok) {
      return submission.reply({
        formErrors: data.errors.full_messages ||
          data.errors || ['サーバーエラーが発生しました。'],
      })
    }
  } catch (e) {
    return submission.reply({
      formErrors: ['サーバーエラーが発生しました。'],
    })
  }

  redirect('/souvenir/complete')
}
