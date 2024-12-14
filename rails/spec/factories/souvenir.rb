FactoryBot.define do
  factory :souvenir do
    name { Faker::Commerce.product_name }
    description { Faker::Lorem.sentence }
    image_url { "https://example.com/image.jpg" }
  end
end
