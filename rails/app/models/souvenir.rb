class Souvenir < ApplicationRecord
  include Aliasable

  belongs_to :user
  belongs_to :category
  has_many :posts, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorited_by_users, through: :favorites, source: :user

  validates :name, presence: true, uniqueness: true
  validates :image_url, presence: true, uniqueness: true

  def self.ransackable_attributes(auth_object = nil)
    [ "id", "name", "category_id", "description" ]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end

  # Favoriteステータス
  def favorited_by?(user)
    favorites.exists?(user_id: user.id)
  end
end
