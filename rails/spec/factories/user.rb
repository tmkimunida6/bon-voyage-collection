FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    password { Faker::Internet.password(min_length: 8) }
    nickname { Faker::Name.name }
    image { "https://example.com/image.jpg" }
    confirmed_at { Time.current }
  end
end
