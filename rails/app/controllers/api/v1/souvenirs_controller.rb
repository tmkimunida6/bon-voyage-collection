class Api::V1::SouvenirsController < Api::V1::BaseController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_souvenir, only: [:show]

  def index
    souvenirs = Souvenir.all
    render json: SouvenirResource.new(souvenirs).serialize
  end

  def show
    render json: SouvenirResource.new(@souvenir).serialize
  end

  def create
    category = Category.find(params[:category_id])
    souvenir = current_user.souvenirs.build(souvenir_params)
    souvenir.category = category
    if souvenir.save
      render json: SouvenirResource.new(souvenir).serialize
    else
      render json: { errors: souvenir.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def souvenir_params
    params.permit(:name, :description, :category_id)
  end

  def set_souvenir
    @souvenir = Souvenir.find(params[:id])
  end
end
