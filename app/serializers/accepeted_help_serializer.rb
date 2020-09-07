class AccepetedHelpSerializer
  include FastJsonapi::ObjectSerializer
  attributes :active, :help_id, :user_id, :help, :user
end
