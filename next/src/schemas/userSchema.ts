import { z } from 'zod'

export const signinSchema = z.object({
  email: z
    .string({ required_error: 'メールアドレスを入力してください。' })
    .email('メールアドレスの形式が正しくありません。'),
  password: z
    .string({ required_error: 'パスワードを入力してください。' })
    .min(8, 'パスワードは8文字以上で入力してください。'),
})

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: 'メールアドレスを入力してください。' })
      .email('メールアドレスの形式が正しくありません。'),
    password: z
      .string({ required_error: 'パスワードを入力してください。' })
      .min(8, 'パスワードは8文字以上で入力してください。'),
    password_confirmation: z
      .string({ required_error: 'パスワードを入力してください。' })
      .min(8, 'パスワードは8文字以上で入力してください。'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードが一致しません。',
    path: ['password_confirmation'],
  })

export const changeProfileSchema = z.object({
  nickname: z.string().optional(),
  image: z.string().url('有効なURLを入力してください。').optional(),
})

export const changeEmailSchema = (currentEmail: string) =>
  z.object({
    new_email: z
      .string({ required_error: 'メールアドレスを入力してください。' })
      .email('メールアドレスの形式が正しくありません。')
      .refine((newEmail) => newEmail !== currentEmail, {
        message:
          '新しいメールアドレスは現在のメールアドレスと異なる必要があります。',
      }),
    current_password: z
      .string({ required_error: 'パスワードを入力してください。' })
      .min(8, 'パスワードは8文字以上で入力してください。'),
  })
