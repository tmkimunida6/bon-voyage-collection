class AddAliasIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :alias_id, :string
    add_index :posts, :alias_id, unique: true
  end
end
