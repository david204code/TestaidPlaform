class AcceptedHelp < ApplicationRecord
  belongs_to :help
  belongs_to :user
  has_one :conversation
end
