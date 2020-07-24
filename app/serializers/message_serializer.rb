class MessageSerializer < ActiveModel::Serializer
  attributes :id, :conversation_id, :title, :created_at
end
