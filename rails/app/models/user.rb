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

  validates :image, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), message: "は有効なURLを入力してください。" }, allow_blank: true

  protected

  # パスワードの変更以外はパスワード入力なしで変更可能にする
  def update_resource(resource, params)
    if params[:password].blank? && params[:password_confirmation].blank?
      resource.update_without_password(params)
    else
      super
    end
  end

  private

  # nickname が空文字の場合は更新をキャンセル
  def prevent_empty_nickname_update
    if nickname_changed? && nickname.blank?
      self.nickname = nickname_was # 以前の値に戻す
    end
  end
end
