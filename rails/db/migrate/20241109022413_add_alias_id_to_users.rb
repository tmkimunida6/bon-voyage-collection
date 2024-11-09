class AddAliasIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :alias_id, :string
    add_index :users, :alias_id, unique: true
  end
end
