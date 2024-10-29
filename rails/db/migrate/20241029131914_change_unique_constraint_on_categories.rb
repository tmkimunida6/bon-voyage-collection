class ChangeUniqueConstraintOnCategories < ActiveRecord::Migration[7.1]
  def change
    remove_index :categories, :name
    add_index :categories, [:name, :ancestry], unique: true
  end
end
