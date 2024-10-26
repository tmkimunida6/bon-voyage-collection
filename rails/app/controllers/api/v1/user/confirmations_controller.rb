class Api::V1::User::ConfirmationsController < Api::V1::BaseController
  def update
    user = User.find_by(confirmation_token: params[:confirmation_token])
    pp user.confirmed_at
    return render json: { message: "User record is not found." }, status: :not_found if user.nil?
    return render json: { message: "User has already been confirmed." }, status: :bad_request if user.confirmed?

    user.update!(confirmed_at: Time.current)

    token = user.create_new_auth_token
    render json: {
      message: "User confirmartion succeeded.",
      access_token: token['access-token'],
      client: token['client'],
      uid: token['uid']
      }, status: :ok
  end
end
