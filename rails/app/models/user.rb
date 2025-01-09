# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
  include Aliasable

  has_many :souvenirs, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorited_souvenirs, through: :favorites, source: :souvenir

  before_update :prevent_empty_nickname_update

  private

  # nickname が空文字の場合は更新をキャンセル
  def prevent_empty_nickname_update
    if nickname_changed? && nickname.blank?
      self.nickname = nickname_was # 以前の値に戻す
    end
  end
end
