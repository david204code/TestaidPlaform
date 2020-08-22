class HelpSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :request_type, :location_long, :location_lat, :status, :color, :user

  has_many :accepted_helps, serializer: AccepetedHelpSerializer
  has_many :conversations, through: :accepted_helps
  has_many :messages, through: :conversations
end
