class CreateSouvenirs < ActiveRecord::Migration[7.1]
  def change
    create_table :souvenirs do |t|
      t.string :name, null: false
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
