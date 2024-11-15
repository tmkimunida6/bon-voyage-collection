class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :souvenir

  validates :user_id, presence: true
  validates :souvenir_id, presence: true
  validates :souvenir_id, uniqueness: { scope: :user_id, message: "はすでに「欲しい！」に追加済みです" }
end
