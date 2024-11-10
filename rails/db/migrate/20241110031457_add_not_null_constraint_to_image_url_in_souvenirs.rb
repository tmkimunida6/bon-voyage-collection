class AddNotNullConstraintToImageUrlInSouvenirs < ActiveRecord::Migration[7.1]
  def change
    change_column_null :souvenirs, :image_url, false
  end
end
