class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :user_id
      t.string :user_name
      t.string :user_image

      t.timestamps
    end
  end
end
