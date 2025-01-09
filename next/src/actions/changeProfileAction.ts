/* eslint @typescript-eslint/no-explicit-any: 0 */

'use server'

import { parseWithZod } from '@conform-to/zod'
import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { changeProfileSchema } from '@/schemas/userSchema'
import { getUserTokens } from '@/utils/getUserTokens'
import { uploadImageAction } from './uploadImageAction'

export async function changeProfileAction(prevState: unknown, formData: FormData) {
  console.log("hi")
  const submission = parseWithZod(formData, {
    schema: changeProfileSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }


  const nickname = formData.get('nickname')
  console.log(formData.get('nickname'))
  const imageFile = formData.get('image') ? String(formData.get('image')) : ''
  const current_password = "password"

  const tokens = await getUserTokens()
  if (!tokens) {
    return submission.reply({
      formErrors: ['ログインしてください。'],
    })
  }

  try {
    let image_url = null
    if (imageFile) {
      // 画像をCloudinaryにアップロード
      const uploadResult = await uploadImageAction(imageFile, 'profile')
      image_url = uploadResult.secure_url
    }

    const res = await fetch(`${apiBaseUrl}/auth`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'access-token': tokens.accessToken,
        client: tokens.client,
        uid: tokens.uid,
      },
      body: JSON.stringify({
        nickname,
        image: image_url,
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
    return submission.reply()
  } catch (error: any) {
    return submission.reply({
      formErrors: error.message || [
        'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
      ],
    })
  }

  // redirect('/setting')
}
