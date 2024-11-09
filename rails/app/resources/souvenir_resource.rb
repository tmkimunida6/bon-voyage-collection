class SouvenirResource
  include Alba::Resource

  attributes :alias_id, :name, :description

  one :user, resource: UserResource
  one :category, resource: CategoryResource
end
