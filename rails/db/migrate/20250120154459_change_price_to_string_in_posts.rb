class ChangePriceToStringInPosts < ActiveRecord::Migration[7.1]
  def up
    change_column :posts, :price, :string
  end

  def down
    change_column :posts, :price, :decimal, precision: 10, scale: 3
  end
end
