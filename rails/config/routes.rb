Rails.application.routes.draw do
  get "up", to: "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1 do
      resources :users, param: :user_id, only: %i[index show create update destroy]
    end
  end
end
