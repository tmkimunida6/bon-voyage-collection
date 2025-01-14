class  Api::V1::User::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def update
    # 現在のメールアドレスと同じ場合
    return render json: { status: "error", errors: { full_messages: [ "新しいメールアドレスは現在のメールアドレスと異なる必要があります。" ] } }, status: :unprocessable_entity if @resource.email == account_update_params[:email]

    # 他のメールアドレスと重複している場合
    return render json: { status: "error", errors: { full_messages: [ "このメールアドレスはすでに使用されています。" ] } }, status: :conflict if User.exists?(email: account_update_params[:email])

    super
  end

  protected

  # パスワードとメールアドレスの変更以外はパスワード入力なしで変更可能にする（devise_token_authオーバーライド）
  def resource_update_method
    if DeviseTokenAuth.check_current_password_before_update == :attributes
      "update_with_password"
    else
      if account_update_params.key?(:password) || account_update_params.key?(:email) || account_update_params.key?(:current_password)
        "update_with_password"
      else
        "update"
      end
    end
  end

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :confirm_success_url)
  end
end
