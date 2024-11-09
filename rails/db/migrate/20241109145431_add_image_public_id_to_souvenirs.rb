class AddImagePublicIdToSouvenirs < ActiveRecord::Migration[7.1]
  def change
    add_column :souvenirs, :image_public_id, :string
    add_index :souvenirs, :image_public_id, unique: true
  end
end
