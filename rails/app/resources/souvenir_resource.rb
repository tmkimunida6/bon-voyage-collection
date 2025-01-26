class SouvenirResource
  include Alba::Resource

  attributes :alias_id
  attributes :name, if: proc { !params[:exclude_name] }
  attributes :updated_at, if: proc { params[:all] }
  attributes :description, if: proc { !params[:exclude_description] }
  attributes :image_url, if: proc { !params[:exclude_image_url] }

  attribute :average_rating, if: proc { !params[:exclude_average_rating] } do |souvenir|
    souvenir.average_rating
  end

  one :category, resource: CategoryResource, if: proc { !params[:exclude_category] }
end
