class AddImagePublicIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :image_public_id, :string
    add_index :posts, :image_public_id, unique: true
  end
end
