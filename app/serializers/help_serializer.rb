class HelpSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :request_type, :location_long, :location_lat, :status, :color, :user_id
end
