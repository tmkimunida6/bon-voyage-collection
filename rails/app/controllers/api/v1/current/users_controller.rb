class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    render json: UserResource.new(current_user, params: { include_email: true }).serialize
  end

  def posts
    posts = current_user.posts
    render json: PostResource.new(posts, params: { mypage_posts: true }).serialize
  end
end
