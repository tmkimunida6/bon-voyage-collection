FactoryBot.define do
  factory :post do
    rating { (Faker::Number.between(from: 2, to: 10) * 0.5).round(1) }
    for_who { Faker::Number.between(from: 0, to: 5) }
    age { Faker::Number.between(from: 0, to: 7) }
    review { Faker::Lorem.paragraph }
    image_url { "https://example.com/image.jpg" }
  end
end
