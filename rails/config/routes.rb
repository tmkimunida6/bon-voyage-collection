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


      # ログイン失敗時のリダイレクト
      get "auth/sign_in", to: "user/omniauth_callbacks#failure"


      # devise認証
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/user/registrations",
        omniauth_callbacks: "api/v1/user/omniauth_callbacks"
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


        collection do
          # 「欲しい」一覧
          get :favorited_index

          # おすすめのお土産
          get :recommend

          # 全件取得（sitemap用）
          get :all
        end

        member do
          get :related
        end
      end

      # 欲しい一括追加
      post "souvenirs/favorites/bulk_create", to: "favorites#bulk_create"

      # カテゴリー
      resources :categories, only: [ :index, :show ]

      # 投稿
      resources :posts, only: [ :index, :create, :destroy ] do
        # 特定のお土産に対する投稿
        collection do
          get "by_souvenir/:id", to: "posts#index_by_souvenir"

          get :posts_with_place
        end
      end
    end
  end
end
