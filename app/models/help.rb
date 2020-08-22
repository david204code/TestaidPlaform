class Help < ApplicationRecord
  belongs_to :user
  has_many :accepted_helps, dependent: :destroy
  has_many :conversations, through: :accepted_helps
  has_many :messages, through: :conversations
  # attr_accessor  :color

  # def initialize
  #   :color == color
  # end

  # def color
  #   if (@request_type == 'one-time')
  #     return 'blue'
  #   else 
  #     return 'green'
  #   end
  # end

end
