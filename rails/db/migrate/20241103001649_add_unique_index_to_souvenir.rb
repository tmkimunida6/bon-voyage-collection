class AddUniqueIndexToSouvenir < ActiveRecord::Migration[7.1]
  def change
    add_index :souvenirs, :name, unique: true
  end
end
