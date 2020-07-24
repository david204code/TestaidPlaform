# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_07_221707) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accepted_helps", force: :cascade do |t|
    t.boolean "completed", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "help_id"
    t.bigint "user_id"
    t.index ["help_id"], name: "index_accepted_helps_on_help_id"
    t.index ["user_id"], name: "index_accepted_helps_on_user_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "accepted_help_id"
    t.index ["accepted_help_id"], name: "index_conversations_on_accepted_help_id"
  end

  create_table "helps", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "request_type"
    t.string "location_long"
    t.string "location_lat"
    t.string "status", default: "unfulfilled"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.string "color"
    t.index ["user_id"], name: "index_helps_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "conversation_id"
    t.bigint "user_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "accepted_helps", "helps"
  add_foreign_key "accepted_helps", "users"
  add_foreign_key "conversations", "accepted_helps"
  add_foreign_key "helps", "users"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "users"
end
