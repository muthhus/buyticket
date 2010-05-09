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

ActiveRecord::Schema.define(:version => 20100326045815) do

  create_table "authors", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "blocks", :force => true do |t|
    t.string   "name",                             :limit => 40, :null => false
    t.string   "post_code",                        :limit => 7,  :null => false
    t.date     "build_date",                                     :null => false
    t.integer  "doc_type_id"
    t.date     "management_agreement_upload_date"
    t.date     "fire_risk_assessment_upload_date"
    t.date     "asbestos_survey_upload_date"
    t.date     "fire_risk_assessment_expiry_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cart_items", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "carts", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "document_types", :primary_key => "doc_type_id", :force => true do |t|
    t.string   "doc_type_name", :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "line_items", :force => true do |t|
    t.integer  "product_id",                                :null => false
    t.integer  "order_id",                                  :null => false
    t.integer  "quantity",                                  :null => false
    t.decimal  "total_price", :precision => 8, :scale => 2, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", :force => true do |t|
    t.string   "name"
    t.text     "address"
    t.string   "email"
    t.string   "pay_type",   :limit => 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.decimal  "price",       :precision => 10, :scale => 2, :default => 0.0
    t.integer  "category"
    t.string   "image_url"
    t.string   "starring"
    t.string   "singer"
    t.string   "director"
    t.string   "Producer"
    t.string   "Music"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "quips", :force => true do |t|
    t.text     "text"
    t.integer  "author_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "hashed_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
