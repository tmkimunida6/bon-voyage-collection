FactoryBot.define do
  factory :souvenir do
    name { Faker::Commerce.product_name }
    description { Faker::Lorem.sentence }
    sequence(:image_url) { |n| "https://example.com/image_#{n}.jpg" }
  end
end
