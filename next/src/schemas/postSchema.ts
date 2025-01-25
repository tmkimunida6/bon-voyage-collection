import { z } from 'zod'

export const postSchema = z.object({
  souvenir_id: z.string({
    required_error: 'お土産を選択してください。',
  }),
  souvenir_name: z.string({
    required_error: 'お土産を選択してください。',
  }),
  rating: z.number().min(1).max(5).optional(),
  for_who: z.number().int().optional(),
  age: z.number().int().optional(),
  review: z.string().optional(),
  image: z.string().optional(),
  place_id: z.string().optional(),
  price: z
    .string()
    .refine((value) => /^[0-9.]+$/.test(value), {
      message: '半角数字のみで入力してください。',
    })
    .refine((value) => /^\d{1,7}(\.\d{1,3})?$/.test(value), {
      message: '8桁以下、小数点第3位までで入力してください。',
    })
    .refine((value) => parseFloat(value) <= 9999999.99, {
      message: '9999999.99以下で入力してください。',
    })
    .refine((value) => parseFloat(value) >= 0, {
      message: '価格は0以上で入力してください。',
    })
    .optional(),
  memory_image: z.string().optional(),
  memory_content: z.string().optional(),
})
