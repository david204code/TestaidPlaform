class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  has_many :helps, dependent: :destroy
  has_many :accepted_helps, dependent: :destroy

  has_one_attached :governmentId
end
