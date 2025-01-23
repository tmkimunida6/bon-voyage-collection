/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { revalidatePath } from 'next/cache'
import { uploadImageAction } from './uploadImageAction'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { postSchema } from '@/schemas/postSchema'
import { getUserTokens } from '@/utils/getUserTokens'

export async function createPostAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: postSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply({
      formErrors: [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  const souvenir_id = formData.get('souvenir_id')
  const rating = formData.get('rating')
  const for_who = formData.get('for_who') ? Number(formData.get('for_who')) : ''
  const age = formData.get('age') ? Number(formData.get('age')) : ''
  const review = formData.get('review')
  const imageFile = formData.get('image') ? String(formData.get('image')) : ''
  const place_id = formData.get('place_id')
  const price = formData.get('price')
  const currency = formData.get('currency')

  const tokens = await getUserTokens()
  if (!tokens) {
    return submission.reply({
      formErrors: ['ログインしてください。'],
    })
  }

  let data
  try {
    let image_url = null
    if (imageFile) {
      // 画像をCloudinaryにアップロード
      const uploadResult = await uploadImageAction(imageFile, 'post')
      image_url = uploadResult.secure_url
    }

    // DBにデータ送信
    const res = await fetch(`${apiBaseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      body: JSON.stringify({
        souvenir_id,
        rating,
        for_who,
        age,
        review,
        image_url,
        place_id,
        price,
        currency,
      }),
    })

    data = await res.json()

    if (!res.ok) {
      return submission.reply({
        formErrors: data.errors || [
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
        ],
      })
    }
    revalidatePath('/timeline')
    return submission.reply()
  } catch (error: any) {
    const message = error.message
      ? error.message
      : 'サーバーエラーが発生しました。時間をおいてから再度お試しください。'
    return submission.reply({
      formErrors: [message],
    })
  }
}
