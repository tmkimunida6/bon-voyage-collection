class AddImageUrlToSouvenirs < ActiveRecord::Migration[7.1]
  def change
    add_column :souvenirs, :image_url, :string
    add_index :souvenirs, :image_url, unique: true
  end
end
