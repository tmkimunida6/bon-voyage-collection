class Category < ApplicationRecord
  # ネスト
  has_ancestry

  has_many :souvenirs
end
