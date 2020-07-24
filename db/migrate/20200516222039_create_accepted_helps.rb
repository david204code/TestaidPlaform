class CreateAcceptedHelps < ActiveRecord::Migration[6.0]
  def change
    create_table :accepted_helps do |t|
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
