class CreateContents < ActiveRecord::Migration
  def self.up
    create_table :contents, :id => false  do |t|
    t.integer :upload_id, :null=>false
    t.string :name_of_file
    t.string :content_type
    t.binary :content
    t.timestamps
  end
 end 

  def self.down
    drop_table :contents
  end
end
