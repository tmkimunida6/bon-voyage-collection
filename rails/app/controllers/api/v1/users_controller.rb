class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  def index; end

  def show; end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find_by!(user_id: params[:user_id])
    render json: { error: "User not found" }, status: :not_found unless @user
  end

  def user_params
    params.require(:user).permit(:user_id, :user_name, :user_image)
  end
end
