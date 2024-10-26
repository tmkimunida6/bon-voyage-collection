import { z } from 'zod'

export const signinSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスを入力してください。' })
    .email('メールアドレスの形式が正しくありません。'),
  password: z
    .string({ required_error: 'パスワードを入力してください。' })
    .min(8, 'パスワードは8文字以上で入力して下さい。'),
})
export const registerSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスを入力してください。' })
    .email('メールアドレスの形式が正しくありません。'),
  password: z
    .string({ required_error: 'パスワードを入力してください。' })
    .min(8, 'パスワードは8文字以上で入力して下さい。'),
  password_confirmation: z
    .string({ required_error: 'パスワードを入力してください。' })
    .min(8, 'パスワードは8文字以上で入力して下さい。'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'パスワードが一致しません。',
  path: ['password_confirmation']
})
