class Api::V1::PostsController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :index_by_souvenir, :posts_with_place ]
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
    if souvenir.nil?
      render json: { errors: [ "お土産を選択してください。" ] }, status: :unprocessable_entity
      return
    end

    # 金額の入力がなく、通貨だけの場合、通貨は登録しない
    processed_params = post_params
    processed_params[:currency] = nil if processed_params[:price].present?

    post = current_user.posts.build(post_params)
    post.souvenir = souvenir
    if post.save
      render json: PostResource.new(post).serialize
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @post && @post.destroy
      render json: { status: "success", message: "投稿が削除されました。" }, status: :ok
    else
      render json: { status: "error", message: "投稿の削除に失敗しました。" }, status: :unprocessable_entity
    end
  end

  def index_by_souvenir
    souvenir = Souvenir.find_by(alias_id: params[:id])
    user = User.find_by(alias_id: params[:user_id])
    posts_by_souvenir = Post.where(souvenir_id: souvenir.id).order("created_at desc")

    # ログイン中ユーザーの投稿を先頭に
    if user
      current_user_posts = posts_by_souvenir.where(user_id: user.id)
      other_user_posts = posts_by_souvenir.where.not(user_id: user.id)
      posts_by_souvenir = current_user_posts + other_user_posts
    end

    paginated_posts = Kaminari.paginate_array(posts_by_souvenir).page(params[:page])

    render json: {
      posts: JSON.parse(PostResource.new(paginated_posts).serialize),
      pages: {
        current_page: paginated_posts.current_page,
        total_pages: paginated_posts.total_pages,
        next_page: paginated_posts.next_page,
        prev_page: paginated_posts.prev_page
      }
    }
  end

  def posts_with_place
    posts = Post.where.not(place_id: [nil, ''])

    render json: JSON.parse(PostResource.new(posts).serialize)
  end

  private

  def post_params
    params.permit(:souvenir_id, :rating, :for_who, :age, :review, :image_url, :place_id, :price, :currency, :memory_image_url, :memory_content)
  end

  def set_post
    @post = Post.find_by(alias_id: params[:id])
  end

  def belongs_to_current_user?
    if @post.present?
      unless @post.user_id == current_user.id
        render json: { error: "ログインしているユーザーを確認してください。" }, status: :forbidden
      end
    else
      render json: { error: "投稿が存在しないか、すでに削除済みです。" }, status: :not_found
    end
  end
end
