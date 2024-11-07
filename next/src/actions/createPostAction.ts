/* eslint @typescript-eslint/no-unused-vars: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { redirect } from 'next/navigation'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { postSchema } from '@/schemas/postSchema'
import { getUserTokens } from '@/utils/getUserTokens'

export async function createPostAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: postSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const souvenir_id = formData.get('souvenir_id')
  const rating = formData.get('rating')
  const to_who = Number(formData.get('for_who'))
  const age = Number(formData.get('age'))
  const review = formData.get('review')

  const tokens = await getUserTokens()
  if (!tokens) {
    return submission.reply({
      formErrors: ['ログインしてください。'],
    })
  }

  let data
  try {
    const res = await fetch(`${apiBaseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      body: JSON.stringify({ souvenir_id, rating, to_who, age, review }),
    })

    data = await res.json()
    if (!res.ok) {
      return submission.reply({
        formErrors: data.errors.full_messages ||
          data.errors || ['サーバーエラーが発生しました。'],
      })
    }
    return submission.reply()
  } catch (e) {
    return submission.reply({
      formErrors: ['サーバーエラーが発生しました。'],
    })
  }
}
