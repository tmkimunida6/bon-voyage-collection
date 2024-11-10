class AddImageUrlToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :image_url, :string
    add_index :posts, :image_url, unique: true
  end
end
