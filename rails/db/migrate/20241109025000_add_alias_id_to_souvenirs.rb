class AddAliasIdToSouvenirs < ActiveRecord::Migration[7.1]
  def change
    add_column :souvenirs, :alias_id, :string
    add_index :souvenirs, :alias_id, unique: true
  end
end
