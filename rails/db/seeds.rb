# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# カテゴリー
# 大カテゴリー
food, goods, fashion = Category.create([
  { name: '食品' },
  { name: '雑貨' },
  { name: 'ファッション' },
])
# 中カテゴリー
confectionery, gourmet = food.children.create([
  { name: 'お菓子' },
  { name: 'ご飯もの' }
])
interior, kitchen = goods.children.create([
  { name: 'インテリア' },
  { name: 'キッチン小物' }
])
mens, ladies = fashion.children.create([
  { name: 'メンズ' },
  { name: 'レディース' }
])
# 小カテゴリー
['甘いもの系', 'しょっぱい系'].each do |name|
  confectionery.children.create(name: name)
end

['肉類', '魚類', '野菜系', '麺類', '米類'].each do |name|
  gourmet.children.create(name: name)
end

['お皿', 'コップ', '調理器具', 'カトラリー'].each do |name|
  kitchen.children.create(name: name)
end

['Tシャツ', 'ジャケット', 'パンツ'].each do |name|
  mens.children.create(name: name)
end

['ドレス', 'スカート', 'ブラウス'].each do |name|
  ladies.children.create(name: name)
end
