class AddMemoryFieldsToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :memory_image_url, :string
    add_column :posts, :memory_content, :text
  end
end
