class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories, :primary_key => :category_id do |t|
      t.string :category_name, :null =>false
    end
  end

  def self.down
    drop_table :categories
  end
end
