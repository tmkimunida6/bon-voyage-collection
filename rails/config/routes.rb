Rails.application.routes.draw do
  get "up", to: "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
    end
  end
end
