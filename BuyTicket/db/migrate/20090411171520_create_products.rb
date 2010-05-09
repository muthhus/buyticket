class CreateProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
      t.column :name, :string
      t.column :description, :string
      t.column :price, :decimal, :precision => 10, :scale => 2, :default =>0
      t.column :category, :integer
      t.column :image_url, :string
      t.column :starring, :string
      t.column :singer, :string
      t.column :director, :string
      t.column :Producer, :string
      t.column :Music, :string
      t.timestamps
    end
  end

  def self.down
    drop_table :products
  end
end
