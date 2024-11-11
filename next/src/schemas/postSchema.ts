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
})
