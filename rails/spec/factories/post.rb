FactoryBot.define do
  factory :post do
    rating { (Faker::Number.between(from: 2, to: 10) * 0.5).round(1) }
    for_who { Faker::Number.between(from: 0, to: 5) }
    age { Faker::Number.between(from: 0, to: 7) }
    review { Faker::Lorem.paragraph }
    sequence(:image_url) { |n| "https://example.com/image_#{n}.jpg" }
  end
end
