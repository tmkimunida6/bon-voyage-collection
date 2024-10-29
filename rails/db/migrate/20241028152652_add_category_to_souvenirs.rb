class AddCategoryToSouvenirs < ActiveRecord::Migration[7.1]
  def change
    add_reference :souvenirs, :category, null: false, foreign_key: true
  end
end
