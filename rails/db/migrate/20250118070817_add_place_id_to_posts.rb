class AddPlaceIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :place_id, :string
  end
end
