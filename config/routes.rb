Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static#index'
  
  scope '/api' do
    defaults format: :json do
      get '/dashboard', to: 'home#index'
    end

    resources :my_applications
    resources :interviews

    resources :settings, only: [:index] do
      collection do
        patch :update_all
      end
    end

    resources :cover_letters do
      member do
        get :duplicate
        get :new_email
        post :send_email
      end
    end
  end

  get '*other', to: 'static#index'
end
