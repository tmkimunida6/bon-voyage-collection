class PostResource
  include Alba::Resource

  attributes :alias_id, :rating, :image_url
  attributes :review, if: proc { params[:mypage_posts] }

  attribute :for_who, if: proc { params[:mypage_posts] } do |post|
    I18n.t("activerecord.attributes.post.for_who.#{post.for_who}") unless post.for_who.nil?
  end

  attribute :age, if: proc { params[:mypage_posts] } do |post|
    I18n.t("activerecord.attributes.post.age.#{post.age}") unless post.age.nil?
  end

  one :user, resource: UserResource, if: proc { params[:mypage_posts] }
  one :souvenir, resource: RestrictedSouvenirResource

end
