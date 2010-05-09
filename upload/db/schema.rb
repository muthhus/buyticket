# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100417070511) do

  create_table "blocks", :primary_key => "block_id", :force => true do |t|
    t.string "block_name", :null => false
    t.string "post_code",  :null => false
    t.date   "build_date", :null => false
  end

  create_table "categories", :primary_key => "category_id", :force => true do |t|
    t.string "category_name", :null => false
  end

  create_table "contents", :id => false, :force => true do |t|
    t.integer  "upload_id",    :null => false
    t.string   "name_of_file"
    t.string   "content_type"
    t.binary   "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "contents", ["upload_id"], :name => "fk_contents_upload"

  create_table "uploads", :force => true do |t|
    t.integer  "block_id",    :null => false
    t.integer  "category_id", :null => false
    t.date     "expiry_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "uploads", ["block_id"], :name => "fk_uploads_block"
  add_index "uploads", ["category_id"], :name => "fk_uploads_category"

end
