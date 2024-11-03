Rails.application.routes.draw do
  # renderヘルスチェック
  get "up", to: "rails/health#show", as: :rails_health_check

  # メールテスト用
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  # API
  namespace :api do
    namespace :v1 do
      # ヘルスチェック
      get "health_check", to: "health_check#index"

      # ユーザー
      # devise認証
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/user/registrations"
      }
      # メール認証後のアクション
      namespace :user do
        resource :confirmations, only: [ :update ]
      end
      # ログイン中のユーザー
      namespace :current do
        resource :user, only: [ :show ]
      end

      # お土産
      resources :souvenirs, only: [ :index, :show, :create ]

      # カテゴリー
      resources :categories, only: [ :index ]
    end
  end
end
