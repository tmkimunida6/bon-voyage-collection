class AddCurrencyToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :currency, :string
  end
end
