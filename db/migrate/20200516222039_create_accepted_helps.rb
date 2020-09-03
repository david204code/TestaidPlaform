class CreateAcceptedHelps < ActiveRecord::Migration[6.0]
  def change
    create_table :accepted_helps do |t|
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
