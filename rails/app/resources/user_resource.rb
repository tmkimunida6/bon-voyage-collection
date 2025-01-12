class UserResource
  include Alba::Resource

  attributes :alias_id, :nickname, :image
  attributes :email, if: proc { params[:include_email] }
end
