# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_11_10_031457) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.string "ancestry", null: false, collation: "C"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ancestry"], name: "index_categories_on_ancestry"
    t.index ["name", "ancestry"], name: "index_categories_on_name_and_ancestry", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "souvenir_id", null: false
    t.decimal "rating", precision: 3, scale: 1
    t.integer "for_who"
    t.integer "age"
    t.text "review"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "alias_id"
    t.string "image_url"
    t.index ["alias_id"], name: "index_posts_on_alias_id", unique: true
    t.index ["image_url"], name: "index_posts_on_image_url", unique: true
    t.index ["souvenir_id"], name: "index_posts_on_souvenir_id"
    t.index ["user_id", "souvenir_id"], name: "index_posts_on_user_id_and_souvenir_id", unique: true
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "souvenirs", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "category_id", null: false
    t.string "alias_id"
    t.string "image_url", null: false
    t.index ["alias_id"], name: "index_souvenirs_on_alias_id", unique: true
    t.index ["category_id"], name: "index_souvenirs_on_category_id"
    t.index ["image_url"], name: "index_souvenirs_on_image_url", unique: true
    t.index ["name"], name: "index_souvenirs_on_name", unique: true
    t.index ["user_id"], name: "index_souvenirs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirm_success_url"
    t.string "alias_id"
    t.index ["alias_id"], name: "index_users_on_alias_id", unique: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "posts", "souvenirs"
  add_foreign_key "posts", "users"
  add_foreign_key "souvenirs", "categories"
  add_foreign_key "souvenirs", "users"
end
