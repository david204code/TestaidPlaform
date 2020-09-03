class HelpsController < ApplicationController
  # before_action :set_help, only: [:show, :edit, :update, :destroy]
  # deals with the InvalidAuthenticityToken
  # protect_from_forgery with: :null_session

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
    @helps = Help.all
    # @help = Help.includes(:accepted_helps).map{|help| help.accepted_helps}
    # @help = Help.all
    # @help = Help.first
    # help 
    # render json: { data: helps }
    # render json: @helps
    render json: @helps.to_json( :methods => [:accepted_helps])
  end

  def index1
    @helps = Help.all
    render json: HelpSerializer.new(@helps, option).serialized_json
  end

  # For the map, condition if Help has 5 accepted_helps and
  def publish
    now = Time.now
    # help_id = Help.ids
    # for each help_id usig that ID to query to AcceptedHelp tables
    # @helps = AcceptedHelp.where(help_id: 1)
    # @helps = Help.left_outer_joins(:accepted_helps).distinct.select('helps. *, COUNT(accepted_helps.*) AS accepted_helps_count').group('help.id')
    @helps = Help.joins(:accepted_helps) && Help.where(status: 'unfulfilled') && Help.where(updated_at: (now - 24.hours)..now) 
    # @helps = Help.joins(:accepted_helps).count 
    # @accepted_helps = AcceptedHelp.where(help_id: params[:id]).count >= 1
    # @helps = Help.where(status: 'unfulfilled') && Help.where(updated_at: (now - 24.hours)..now)
    # @helps = Help.where(status: 'unfulfilled') && @accepted_helps
    render json: @helps, :include => {:accepted_helps => {}}
    # render json: @accepted_helps, :include => {:help => {}}
    # render json: help_id, :include => {:accepted_helps => {}}
    # render json: @helps
  end

  # presently not being use
  def myHelp
    # @helps = Help.find_by user_id: current_user
    @helps = Help.where(user_id: current_user)
    render json: HelpSerializer.new(@helps, option).serialized_json
  end

  # current dashboard display
  def activeHelp
    @helps = Help.where(user_id: current_user, status: 'unfulfilled')
    # render json: HelpSerializer.new(@helps, option).serialized_json
    render json: @helps, :include => {
      :user => {
        
      },
      :accepted_helps => {
        :include => {
          :user => {
            
          }
        }
      },
      :conversations => {

      },
      :messages => {

      },
    }
  end

  def helpChat
    # @helps = Help.find_by user_id: current_user
    @helps = Help.where(user_id: current_user) && Help.find(params[:id])
    # render json: @helps.to_json( :methods => [:accepted_helps, :conversations, :messages])
    render json: @helps, :include => {
      :user => {
      },
      :accepted_helps => {
        :only => [:id, :user_id],
        :include => {
          :user => {
            :only => [:id, :email,]
          }
        }
      },
      :conversations => {
      },
      :messages => {
      },
    }
    # render json: HelpSerializer.new(@helps, option).serialized_json
  end
  
  def counter
    @helps = Help.where(status: 'unfulfilled').count
    render json: @helps
  end
  
  def show 
    @help ||= Help.find(params[:id])
    # render json: { data: @help }
    render json: @help
  end

  def show1
    help = Help.find_by(id: params[:id])
    render json: HelpSerializer.new(help).serialized_json
  end

  private
    # specify the resources that want to be included
  def option
    @options ||= { include: %i[accepted_helps]}
  end

  def set_help
    @help = Help.find(params[:id])
  end

  def help_params
    params.require(:help).permit(
      :title,
      :description,
      :request_type,
      :location_long,
      :location_lat,
      :status
    )
  end

end
