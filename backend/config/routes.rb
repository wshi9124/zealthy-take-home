# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: %i[index create show update]
  resources :page_configs, only: %i[index]
  put 'page_configs', to: 'page_configs#update'
end
