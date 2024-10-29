class SouvenirResource
  include Alba::Resource

  attributes :id, :name, :description, :created_at

  one :user, resource: UserResource
  one :category, resource: CategoryResource
end
