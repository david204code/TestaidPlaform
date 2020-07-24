class AddColorAttributeToHelps < ActiveRecord::Migration[6.0]
  def change
    add_column :helps, :color, :string
  end
end
