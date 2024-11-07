class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :souvenir, null: false, foreign_key: true
      t.decimal :rating, precision: 3, scale: 1
      t.integer :for_who
      t.integer :age
      t.text :review

      t.timestamps
    end

    add_index :posts, [ :user_id, :souvenir_id ], unique: true
  end
end
