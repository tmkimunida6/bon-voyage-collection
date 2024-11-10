require 'yaml'
require 'faker'

# カテゴリー
def create_categories(categories, parent = nil)
  categories.each do |category_data|
    begin
      children = category_data.delete('children')
      category = Category.create(category_data.merge(parent: parent))
      create_categories(children, category) if children
    rescue => e
      puts "Invalid category data: #{category_data} #{e.message}"
    end
  end
end

categories_data = YAML.load_file(Rails.root.join('db/seeds/categories.yml'))
create_categories(categories_data['categories'])


# ユーザー
users = 20.times.map do
  User.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    password_confirmation: "password"
  )
end


# お土産
users = User.all
categories = Category.all
souvenirs = 50.times.map do
  Souvenir.create!(
    name: Faker::Commerce.product_name,
    description: [ Faker::Lorem.sentence, Faker::Lorem.sentences(number: 5).join(' ') ].sample,
    user: users.sample,
    category: categories.sample,
    image_url: "https://res.cloudinary.com/demo/image/upload/v#{rand(1000..9999)}/cld-sample-#{rand(2...5)}.jpg"
  )
end

# 投稿
users = User.all
souvenirs = Souvenir.all
50.times do
  Post.create!(
    rating: [ (rand(9) + 2) * 0.5, nil ].sample,
    for_who: [ Post.for_whos.keys.sample, nil ].sample,
    age: [ Post.ages.keys.sample, nil ].sample,
    review: [ Faker::Lorem.paragraph, Faker::Lorem.sentences(number: 5).join(' '), nil ].sample,
    souvenir: souvenirs.sample,
    user: users.sample,
    image_url: [ "https://res.cloudinary.com/demo/image/upload/v#{rand(1000..9999)}/cld-sample-#{rand(2...5)}.jpg", nil ].sample
  )
end
