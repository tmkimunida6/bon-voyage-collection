class Api::V1::FavoritesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_souvenir

  def create
    favorite = current_user.favorites.new(souvenir_id: @souvenir.id)
    if favorite && favorite.save
      render json: { status: "success", message: "「欲しい！」に追加しました。" }, status: :created
    else
      render json: { status: "error", message: favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    favorite = current_user.favorites.find_by(souvenir_id: @souvenir.id)
    if favorite && favorite.destroy
      render json: { status: "success", message: "「欲しい！」から削除しました。" }, status: :created
    else
      render json: { status: "error", message: "「欲しい！」からの削除に失敗しました。" }, status: :unprocessable_entity
    end
  end

  # 配列で渡ってきたお土産を一気にお気に入りに追加（Recommendから会員登録時）
  def bulk_create
    souvenir_ids = params[:souvenir_ids]
    return render json: { status: "error" }, status: :unprocessable_entity if souvenir_ids.blank?

    souvenir_ids.each do |souvenir_id|
      souvenir = Souvenir.find_by(alias_id: souvenir_id)
      favorite = current_user.favorites.new(souvenir_id: souvenir.id) if souvenir && !current_user.favorites.exists?(souvenir_id: souvenir.id)
      favorite && favorite.save
    end

    render json: { status: "success", message: "おすすめのお土産を「欲しい！」に追加しました。" }, status: :created
  end

  private

  def set_souvenir
    @souvenir = Souvenir.find_by(alias_id: params[:souvenir_id])
  end
end
