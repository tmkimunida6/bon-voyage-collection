class Api::V1::User::ConfirmationsController < Api::V1::BaseController
  def update
    user = User.find_by(confirmation_token: params[:confirmation_token])
    return render json: { message: "ユーザーが見つかりませんでした。再度会員登録を行ってください。" }, status: :not_found if user.nil?
    return render json: { message: "このユーザーはすでに認証済みです。" }, status: :bad_request if user.confirmed?

    user.update!(confirmed_at: Time.current)

    token = user.create_new_auth_token
    render json: {
      message: "ユーザー認証に成功しました。",
      access_token: token["access-token"],
      client: token["client"],
      uid: token["uid"]
      }, status: :ok
  end
end
