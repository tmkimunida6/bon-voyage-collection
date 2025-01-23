/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { revalidatePath } from 'next/cache'
import { uploadImageAction } from './uploadImageAction'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { changeProfileSchema } from '@/schemas/userSchema'
import { getUserTokens } from '@/utils/getUserTokens'

export async function changeProfileAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: changeProfileSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply({
      formErrors: [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  const nickname = formData.get('nickname')
  const imageFile = formData.get('image') ? String(formData.get('image')) : ''

  const tokens = await getUserTokens()
  if (!tokens) {
    return submission.reply({
      formErrors: ['ログインしてください。'],
    })
  }

  try {
    let image_url: string | null = null
    if (imageFile) {
      // 画像をCloudinaryにアップロード
      const uploadResult = await uploadImageAction(imageFile, 'profile')
      image_url = uploadResult.secure_url
    }

    const body: { nickname?: string; image?: string } = {}
    if (nickname) {
      body.nickname = String(nickname)
    }
    if (image_url) {
      body.image = image_url
    }

    const res = await fetch(`${apiBaseUrl}/auth`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return submission.reply({
        formErrors: data.errors || [
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
        ],
      })
    }

    revalidatePath('/setting/profile')
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
