class CreateUploads < ActiveRecord::Migration
  def self.up
    create_table :uploads do |t|
     t.integer :block_id, :null=>false
     t.integer :category_id, :null=>false
     t.date :expiry_date
     t.timestamps
    end
  end
  def self.down
    drop_table :uploads
  end
end
