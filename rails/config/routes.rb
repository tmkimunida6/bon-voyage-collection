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
        resource :user, only: [ :show ] do
          member do
            get :posts
          end
        end
      end

      # お土産
      resources :souvenirs, only: [ :index, :show, :create ] do
        # 欲しい登録/削除
        resource :favorites, only: [ :create, :destroy ]

        # 「欲しい」一覧
        collection do
          get :favorited_index
        end

        member do
          get :related
          get :favorited_status
        end
      end

      # カテゴリー
      resources :categories, only: [ :index, :show ]

      # 投稿
      resources :posts, only: [ :index, :create, :destroy ] do
        # 特定のお土産に対する投稿
        collection do
          get "by_souvenir/:id", to: "posts#index_by_souvenir"
        end
      end
    end
  end
end
