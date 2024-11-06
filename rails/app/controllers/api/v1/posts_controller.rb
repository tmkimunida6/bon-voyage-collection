class Api::V1::PostsController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index ]

  def index
    posts = Post.all
    render json: PostResource.new(posts).serialize
  end

  def create
    souvenir = Souvenir.find(params[:souvenir_id])
    post = current_user.posts.build(post_params)
    post.souvenir = souvenir
    if post.save
      render json: PostResource.new(post).serialize
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit(:souvenir_id, :rating, :for_who, :age, :review)
  end
end
