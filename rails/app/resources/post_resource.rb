class PostResource
  include Alba::Resource

  attributes :alias_id, :rating, :image_url
  attributes :review, :place_id, :price, :currency, if: proc { !params[:mypage_posts] }
  attributes :memory_image_url, :memory_content, if: proc { params[:mypage_posts] }

  attribute :for_who, if: proc { !params[:mypage_posts] } do |post|
    I18n.t("activerecord.attributes.post.for_who.#{post.for_who}") unless post.for_who.nil?
  end

  attribute :age, if: proc { !params[:mypage_posts] } do |post|
    I18n.t("activerecord.attributes.post.age.#{post.age}") unless post.age.nil?
  end

  one :user, resource: UserResource
  one :souvenir, resource: RestrictedSouvenirResource
end
