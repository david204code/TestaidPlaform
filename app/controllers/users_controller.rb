class UsersController < ApplicationController

  def index
    # @users = User.all
    @users = User.all.with_attached_governmentId
    if @users
      render json: {
        users: @users
      }
    else
      render json: {
        status: 500,
        errors: ['no users found']
      }
    end
  end

  def show
    user = User.find_by(id: params[:id])
    governmentId = rails_blob_path(user.governmentId)
    
    if user
      render json: {
        user: user, governmentId: governmentId
      }
    else
      render json: {
        status: 500,
        errors: ['user not found']
      }
    end
  end

  def create 
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: @user.errors.full_messages
      }
    end
  end

  def update
    user = User.find(params[:id])
    user.update(governmentId: params[:governmentId])
    governmentId_url = rails_blob_path(user.governmentId)
    render json: {user: user, governmentId_url: governmentId_url}
  end

  private 

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
