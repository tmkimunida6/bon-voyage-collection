class Souvenir < ApplicationRecord
  include Aliasable

  belongs_to :user
  belongs_to :category
  has_many :posts, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :image_url, presence: true, uniqueness: true

  def self.ransackable_attributes(auth_object = nil)
    [ "id", "name", "category_id", "description" ]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
