class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    render json: UserResource.new(current_user).serialize
  end

  def posts
    posts = current_user.posts
    render json: PostResource.new(posts).serialize
  end
end
