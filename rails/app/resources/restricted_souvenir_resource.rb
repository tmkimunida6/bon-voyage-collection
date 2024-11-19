class RestrictedSouvenirResource < SouvenirResource
  def attributes
    super.select { |key, _| [ :alias_id, :name, :image_url ].include?(key.to_sym) }
  end
end
