class Api::V1::User::ConfirmationsController < Api::V1::BaseController
  def update
    begin
      user = User.find_by(confirmation_token: params[:confirmation_token])
      return render json: { message: "ユーザーが見つかりませんでした。再度会員登録を行ってください。" }, status: :not_found if user.nil?
      return render json: { message: "このメールアドレスはすでに認証済みです。" }, status: :bad_request if user.confirmed? && !user.pending_reconfirmation?

      if user.pending_reconfirmation?
        user.skip_reconfirmation!
        user.email = user.unconfirmed_email
        user.unconfirmed_email = nil
      end

      user.confirmed_at = Time.current
      user.save!

      token = user.create_new_auth_token
      render json: {
        message: "メールアドレスの認証に成功しました",
        access_token: token["access-token"],
        client: token["client"],
        uid: token["uid"],
        }, status: :ok

    rescue StandardError => e
      render json: { message: "サーバーエラーが発生しました。時間をおいてから再度お試しください。" }, status: :unprocessable_entity
    end
  end
end
