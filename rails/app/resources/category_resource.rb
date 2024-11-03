class CategoryResource
  include Alba::Resource

  attributes :id, :name

  one :parent, resource: CategoryResource, if: proc { |category| category.parent.present? }
end
