class Souvenir < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :name, presence: true, uniqueness: true

  def self.ransackable_attributes(auth_object = nil)
    ["id", "name", "category_id", "description"]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
