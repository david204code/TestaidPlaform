class AccepetedHelpSerializer
  include FastJsonapi::ObjectSerializer
  attributes :completed, :help_id, :user_id, :help
end
