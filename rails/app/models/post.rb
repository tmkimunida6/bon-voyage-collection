require "bigdecimal"
require "bigdecimal/util"

class Post < ApplicationRecord
  include Aliasable

  belongs_to :user
  belongs_to :souvenir

  enum for_who: { for_myself: 0, for_family: 1, for_friends: 2, for_partner: 3, for_pets: 4, for_other: 5 }
  enum age: { under_ten: 0, teens: 1, twenties: 2, thirties: 3, forties: 4, fifties: 5, sixties: 6, over_seventies: 7 }

  validates :souvenir_id, presence: { message: "を選択してください" }, uniqueness: { scope: :user_id, message: "はすでに記録済みです。" }
  validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5, message: "は1以上5以下の値で入力してください。" }, allow_nil: true

  # 平均評価スコア
  def self.average_rating
    ratings = where.not(rating: nil).pluck(:rating).map(&:to_d)
    return nil if ratings.empty?

    average = ratings.sum / ratings.size
    formatted_average = format("%.1f", average)
    formatted_average
  end
end
