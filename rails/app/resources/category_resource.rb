class CategoryResource
  include Alba::Resource

  attributes :id, :name

  many :children, resource: CategoryResource
end
