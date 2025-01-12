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


  # メールアドレス変更時は別のテンプレートを使用するように上書き
  def send_confirmation_instructions(opts = {})
    generate_confirmation_token! unless @raw_confirmation_token

    # fall back to "default" config name
    opts[:client_config] ||= "default"
    opts[:to] = unconfirmed_email if pending_reconfirmation?
    opts[:redirect_url] ||= DeviseTokenAuth.default_confirm_success_url

    if pending_reconfirmation?
      send_devise_notification(:email_change_confirmation_instructions, @raw_confirmation_token, opts)
    else
      send_devise_notification(:confirmation_instructions, @raw_confirmation_token, opts)
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
