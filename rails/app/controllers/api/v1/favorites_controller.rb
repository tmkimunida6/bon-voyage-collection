class Api::V1::FavoritesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_souvenir

  def create
    favorite = current_user.favorites.new(souvenir_id: @souvenir.id)
    if favorite.save
      render json: { status: 'success', message: '「欲しい！」に追加しました。' }, status: :created
    else
      render json: { status: 'error', message: favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    favorite = current_user.favorites.find_by(souvenir_id: @souvenir.id)
    if favorite.destroy
      render json: { status: 'success', message: '「欲しい！」から削除しました。' }, status: :created
    else
      render json: { status: 'error', message: favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_souvenir
    @souvenir = Souvenir.find_by(alias_id: params[:souvenir_id])
  end
end
