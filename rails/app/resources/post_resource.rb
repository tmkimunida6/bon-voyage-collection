class PostResource
  include Alba::Resource

  attributes :alias_id, :rating, :for_who, :age, :review, :image_url

  one :user, resource: UserResource
  one :souvenir, resource: SouvenirResource

  attribute :for_who do |post|
    I18n.t("activerecord.attributes.post.for_who.#{post.for_who}") unless post.for_who.nil?
  end

  attribute :age do |post|
    I18n.t("activerecord.attributes.post.age.#{post.age}") unless post.age.nil?
  end
end
