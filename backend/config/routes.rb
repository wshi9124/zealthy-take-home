Rails.application.routes.draw do
  resources :users, only:[:index, :create, :show, :update]
  resources :page_configs, only: [:index, :create]
end
