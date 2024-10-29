class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.all.arrange_serializable do |parent, children|
      {
        id: parent.id,
        name: parent.name,
        children: children
      }
    end
    render json: categories
  end
end
