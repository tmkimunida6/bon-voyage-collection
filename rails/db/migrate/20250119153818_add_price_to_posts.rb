class AddPriceToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :price, :decimal, precision: 10, scale: 3
  end
end
