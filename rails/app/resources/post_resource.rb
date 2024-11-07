class PostResource
  include Alba::Resource

  attributes :id, :rating, :for_who, :age, :review, :created_at

  one :user, resource: UserResource
  one :souvenir, resource: SouvenirResource

  attribute :for_who do |post|
    I18n.t("activerecord.attributes.post.for_who.#{post.for_who}")
  end

  attribute :age do |post|
    I18n.t("activerecord.attributes.post.age.#{post.age}")
  end
end
