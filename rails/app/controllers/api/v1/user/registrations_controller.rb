class  Api::V1::User::RegistrationsController < DeviseTokenAuth::RegistrationsController
  protected
  # パスワードとメールアドレスの変更以外はパスワード入力なしで変更可能にする（devise_token_authオーバーライド）
  def resource_update_method
    if DeviseTokenAuth.check_current_password_before_update == :attributes
      'update_with_password'
    else
      if account_update_params.key?(:password) || account_update_params.key?(:email) || account_update_params.key?(:current_password)
        'update_with_password'
        # binding.pry
      else
        'update'
      end
    end
  end

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :confirm_success_url)
  end
end
