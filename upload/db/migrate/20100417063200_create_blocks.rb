class CreateBlocks < ActiveRecord::Migration
  def self.up
    create_table :blocks, :primary_key => :block_id do |t|
  t.string :block_name, :null=>false
  t.string :post_code, :null=>false
  t.date  :build_date, :null=>false
    end
  end

  def self.down
    drop_table :blocks
  end
end
