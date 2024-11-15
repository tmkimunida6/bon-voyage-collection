class Api::V1::PostsController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index ]
  before_action :set_post, only: [ :destroy ]
  before_action :belongs_to_current_user?, only: [ :destroy ]

  def index
    posts = Post.includes(:user, :souvenir).order("created_at desc").page(params[:page])
    render json: {
      posts: JSON.parse(PostResource.new(posts).serialize),
      pages: {
        current_page: posts.current_page,
        total_pages: posts.total_pages,
        next_page: posts.next_page,
        prev_page: posts.prev_page
      }
    }
  end

  def create
    souvenir = Souvenir.find_by(alias_id: params[:souvenir_id])
    post = current_user.posts.build(post_params)
    post.souvenir = souvenir
    if post.save
      render json: PostResource.new(post).serialize
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @post.destroy
      render json: { message: '投稿が削除されました。' }, status: :ok
    else
      render json: { error: '投稿の削除に失敗しました。' }, status: :unprocessable_entity
    end

  end

  private

  def post_params
    params.permit(:souvenir_id, :rating, :for_who, :age, :review, :image_url)
  end

  def set_post
    @post = Post.find_by(alias_id: params[:id])
  end

  def belongs_to_current_user?
    pp @post.user_id
    pp current_user.id
    unless @post.user_id == current_user.id
      render json: { error: 'ログインしているユーザーを確認してください。' }, status: :forbidden
    end
  end
end
