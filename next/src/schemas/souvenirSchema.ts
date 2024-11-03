import { z } from 'zod'

export const newSouvenirSchema = z.object({
  souvenir_name: z.string({
    required_error: 'お土産の名称を入力してください。',
  }),
  category_id: z.string({ required_error: 'カテゴリーを選択してください。' }),
  category_name: z.string({ required_error: 'カテゴリーを選択してください。' }),
  souvenir_description: z
    .string()
    .max(200, '200文字以内で入力してください。')
    .optional(),
})
