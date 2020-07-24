class HelpsController < ApplicationController
  before_action :set_help, only: [:show, :edit, :update, :destroy]

  def new 
    @help = Help.new(user:current_user)
  end

  def create
    # @help = Help.create!(help_params)
    # @help.user_id = session[:user_id]
    
    @help = Help.new(help_params.merge(user_id: session[:user_id]))
    
    if @help.request_type == 'material-need'
      @help.color = "red"
    else
      @help.color = "blue"
    end

    # @help = Help.new(title: params[:title],
    #                 description: params[:description],
    #                 request_type: params[:request_type],
    #                 location_long: params[:location_long],
    #                 location_lat: params[:location_lat],
    #                 status: params[:status],
    #                 user_id: session[:user_id])

    unless @help.save
      render json: @help.errors, status: :unprocessable_entity
    end

    respond_to do |format|
      if @help.save
        format.html { redirect_to @help, notice: 'Help was successfully created.' }
        # format.json { render :show, status: :created, location: @help }
      else
        format.html { render :new }
        format.json { render json: @help.errors, status: :unprocessable_entity }
      end
    end
  end

  def index
    @help = Help.includes(:accepted_helps)
    # @help = Help.includes(:accepted_helps).map{|help| help.accepted_helps}
    # @help = Help.all
    # @help = Help.first
    # help 
    # render json: { data: @help }
    render json: @help.to_json( :methods => [:accepted_helps])
  end
  
  def show 
    @help ||= Help.find(params[:id])
    # render json: { data: @help }
    render json: @help
  end
  
  def helpUser
    @help ||= Help.find(params[:id])
    # might need to render the username
    render json: @help.user
  end

  private

  def set_help
    @help = Help.find(params[:id])
  end

  def help_params
    params.fetch(:help, {}).permit(
      :title,
      :description,
      :request_type,
      :location_long,
      :location_lat,
      :status
    )
  end

end
