class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, except: [:password_digest], status: :ok
    end

    def create
        user = User.find_by(email: params[:email])
        if user
          # If user exists, check password and log them in
          if user.authenticate(params[:password])
            render json: user, except: [:password_digest], status: :ok
          else
            render json: { error: "Invalid password" }, status: :unauthorized
          end
        else
          # If user does not exist, create a new user
          user = User.create!(user_params)
          render json: user, except: [:password_digest], status: :created
        end
      end
      
    def show
          render json: current_user
    end

    def update 
      user = User.find(params[:id])
      user.update!(user_update_params)
      render json: user, status: 202
    end 

    private

    def user_params
        params.permit(:email, :password)
    end

    def user_update_params
      params.permit(:about_me, :street_address, :city, :state, :zip, :birthdate)
    end
end
