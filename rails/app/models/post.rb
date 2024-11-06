class Post < ApplicationRecord
  belongs_to :user
  belongs_to :souvenir

  enum for_who: { for_myself: 0, for_family: 1, for_friends: 2, for_partner: 3, for_pets: 4, for_other: 5 }
  enum age: { under_ten: 0, teens: 1, twenties: 2, thirties: 3, forties: 4, fifties: 5, sixties: 6, over_seventies: 7 }
end
