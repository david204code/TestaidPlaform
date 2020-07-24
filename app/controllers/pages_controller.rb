class PagesController < ApplicationController
  def home
  end

  def dashboard
    render json: { status: "It's working"}
  end

end
