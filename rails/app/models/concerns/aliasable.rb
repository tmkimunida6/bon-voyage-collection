module Aliasable
  extend ActiveSupport::Concern

  included do
    before_create :set_alias_id
  end

  private

  def to_param
    alias_id
  end

  def set_alias_id
    self.alias_id = generate_unique_alias_id
  end

  def generate_unique_alias_id
    loop do
      random_id = SecureRandom.hex(6)
      break random_id unless self.class.exists?(alias_id: random_id)
    end
  end
end
