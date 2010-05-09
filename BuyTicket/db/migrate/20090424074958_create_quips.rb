class CreateQuips < ActiveRecord::Migration
  def self.up
    create_table :quips do |t|
      t.column :text, :text
      t.column :author_id, :int
      t.timestamps
    end
  end

  def self.down
    drop_table :quips
  end
end
