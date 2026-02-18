class Api::V1::User::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  # 成功時
  def omniauth_success
    user = User.find_or_create_by_oauth(request.env["omniauth.auth"])
    if user.persisted?
      client_id = SecureRandom.urlsafe_base64(nil, false)
      token = SecureRandom.urlsafe_base64(nil, false)
      token_hash = BCrypt::Password.create(token)
      expiry = (Time.now + DeviseTokenAuth.token_lifespan).to_i

      user.tokens[client_id] = {
        token: token_hash,
        expiry: expiry
      }
      user.confirmed_at = Time.current # メール認証をスキップ
      user.save

      redirect_to "#{ENV.fetch("FRONT_DOMAIN")}/auth/callback?status=success&uid=#{user.uid}&accessToken=#{token}&client=#{client_id}&expiry=#{expiry}", allow_other_host: true
    else
      redirect_to "#{ENV.fetch("FRONT_DOMAIN")}/auth/callback?status=failure", allow_other_host: true
    end
  end

  # 失敗時
  def failure
    redirect_to "#{ENV.fetch("FRONT_DOMAIN")}/auth/callback?status=failure", allow_other_host: true
  end

  private

  # リソースクラスが取得できないエラーが出るので明示する
  def resource_class
    User
  end
end
