import InputWithLabel from '../../molecules/InputWithLabel'
import { FormFieldType } from '@/app/types/types'

const SigninForm = ({ fields }: FormFieldType) => {
  return (
    <>
      <InputWithLabel
        label="メールアドレス"
        type="email"
        name={fields.email.name}
        placeholder="example@email.com"
        errors={fields.email.errors}
      />
      <InputWithLabel
        label="パスワード"
        type="password"
        name={fields.password.name}
        placeholder="パスワードを入力して下さい"
        errors={fields.password.errors}
      />
    </>
  )
}

export default SigninForm
