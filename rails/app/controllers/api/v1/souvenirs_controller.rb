class Api::V1::SouvenirsController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :show, :related ]
  before_action :set_souvenir, only: [ :show, :related, :favorited_index ]

  def index
    q = Souvenir.ransack(souvenir_search_params)
    souvenirs = q.result(distinct: true).includes(:user, :category).order("created_at desc").page(params[:page])
    render json: {
      souvenirs: JSON.parse(SouvenirResource.new(souvenirs).serialize),
      pages: {
        current_page: souvenirs.current_page,
        total_pages: souvenirs.total_pages,
        next_page: souvenirs.next_page,
        prev_page: souvenirs.prev_page
      }
    }
  end

  def show
    render json: SouvenirResource.new(@souvenir).serialize
  end

  def related
    related_souvenirs = Souvenir.where(category_id: @souvenir.category_id).where.not(alias_id: @souvenir.alias_id)
    render json: RelatedSouvenirResource.new(related_souvenirs).serialize
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

  # Favorite一覧
  def favorited_index
    favorited_souvenirs = current_user.favorited_souvenirs.includes(:user, :category)
    render json: JSON.parse(SouvenirResource.new(favorited_souvenirs).serialize)
  end

  private

  def souvenir_params
    params.permit(:name, :description, :category_id, :image_url)
  end

  def set_souvenir
    @souvenir = Souvenir.find_by(alias_id: params[:id])
  end

  def souvenir_search_params
    params.permit(:name_or_description_cont, :category_id_eq, :page)
  end
end
