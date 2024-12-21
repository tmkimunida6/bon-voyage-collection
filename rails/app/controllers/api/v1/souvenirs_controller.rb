class Api::V1::SouvenirsController < Api::V1::BaseController
  before_action :authenticate_user!, except: [ :index, :show, :related, :recommend ]
  before_action :set_souvenir, only: [ :show, :related, :favorited_index ]

  def index
    q = find_descendant_categories

    souvenirs = q.result(distinct: true).includes(:user, :category).order("created_at desc").page(params[:page])
    render json: {
      souvenirs: JSON.parse(SouvenirResource.new(souvenirs, params: { exclude_description: false, exclude_category: false }).serialize),
      pages: {
        current_page: souvenirs.current_page,
        total_pages: souvenirs.total_pages,
        next_page: souvenirs.next_page,
        prev_page: souvenirs.prev_page
      }
    }
  end

  def show
    if @souvenir
      render json: SouvenirResource.new(@souvenir).serialize
    else
      render json: { message: 'お土産が見つかりませんでした。' }, status: :not_found
    end
  end

  def related
    related_souvenirs = Souvenir.where(category_id: @souvenir.category_id).where.not(alias_id: @souvenir.alias_id)
    render json: SouvenirResource.new(related_souvenirs, params: { exclude_description: true, exclude_category: true }).serialize
  end

  def create
    begin
      category = Category.find(params[:category_id])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [ "カテゴリーを選択してください。" ] }, status: :not_found
      return
    end

    souvenir = current_user.souvenirs.build(souvenir_params)
    souvenir.category = category
    if souvenir.save
      render json: SouvenirResource.new(souvenir, params: { exclude_description: true, exclude_image_url: true, exclude_average_rating: true, exclude_category: true }).serialize
    else
      render json: { errors: souvenir.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Favorite一覧
  def favorited_index
    favorited_souvenirs = current_user.favorited_souvenirs.includes(:user, :category)
    render json: JSON.parse(SouvenirResource.new(favorited_souvenirs, params: { exclude_description: true, exclude_category: true }).serialize)
  end

  def recommend
    q = find_descendant_categories
    if current_user
      # お気に入り済みと投稿済みは除外
      favorited_ids = current_user.favorited_souvenirs.pluck(:alias_id)
      posted_ids = current_user.posts.joins(:souvenir).pluck('souvenirs.alias_id')

      souvenirs = q.result
                   .where.not(alias_id: favorited_ids + posted_ids)
                   .includes(:user, :category)
                   .order("RANDOM()")
                   .limit(10)
    else
      souvenirs = q.result
                   .includes(:user, :category)
                   .order("RANDOM()")
                   .limit(10)
    end

    render json: JSON.parse(SouvenirResource.new(souvenirs, params: { exclude_description: true }).serialize)
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

  def find_descendant_categories
    if souvenir_search_params[:category_id_eq].present?
      category = Category.find_by(id: souvenir_search_params[:category_id_eq])
      if category.nil?
        render json: {
          souvenirs: [],
          pages: {
            current_page: 1,
            total_pages: 0,
            next_page: nil,
            prev_page: nil
          }
        } and return
      end

      descendant_ids = category.subtree_ids
      Souvenir.ransack(category_id_in: descendant_ids, name_or_description_cont: souvenir_search_params[:name_or_description_cont])
    else
      Souvenir.ransack(name_or_description_cont: souvenir_search_params[:name_or_description_cont])
    end
  end

end
