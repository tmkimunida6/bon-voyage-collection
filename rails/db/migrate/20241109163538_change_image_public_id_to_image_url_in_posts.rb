class ChangeImagePublicIdToImageUrlInPosts < ActiveRecord::Migration[7.1]
  def change
    remove_column :posts, :image_public_id, :string
    add_column :posts, :image_url, :string
    add_index :posts, :image_url, unique: true
  end
end
