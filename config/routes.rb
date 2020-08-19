Rails.application.routes.draw do
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  resources :users, only: [:create, :show, :index]

  # resources :helps do
  #   resources :accepted_helps
  #   get '/accepted_help/last', to: 'accepted_helps#getLast'
  #   get '/accepted_help/:id/userInfo', to: 'accepted_helps#getUser'
  #   get '/accepted_help/:id', to: 'accepted_helps#getId'
  # end

  resources :helps, param: :id
  get '/helps1', to: 'helps#index1'
  get '/help/:id', to: 'helps#show1'
  get '/myHelp', to: 'helps#myHelp'
  resources :accepted_helps
  get 'accepted_helps1', to: 'accepted_helps#index1'
  get 'accepted_help/:id', to: 'accepted_helps#show1'
  get 'latest/accepted_help', to: 'accepted_helps#getLast'
  get '/myAccepted', to: 'accepted_helps#getAcceptedHelp'
  
  get '/helps/:id/user', to: 'helps#helpUser'

  resources :messages
  resources :conversations
  get '/conversation/:id', to: 'conversations#findAccepted'

  # resources :helps
  # get 'helps', to: 'helps#index'

  # resources :accepted_helps
  # get 'acceptedhelps', to: 'accepted_helps#index'

  root 'pages#home'
  # get 'pages/home'
  # get 'pages/dashboard'
  # get 'pages/index'
  # root 'messages#index'

  # get 'messages', to: 'messages#index'
  # resources :messages, except: [:index]
  # resources :conversations, only: [:index, :create]
  # resources :messages, only: [:create]
  mount ActionCable.server => '/cable'

  match '*pages', to: 'pages#home', via: :all
end
