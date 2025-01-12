class UserMailer < Devise::Mailer
  # def confirmation_on_create_instructions(record, token, opts = {})
  #   pp 'ああああああああああああああああああああああああああああ'
  #   @token = token
  #   devise_mail(record, :confirmation_on_create_instructions, opts)
  # end

  def email_change_confirmation_instructions(record, token, opts = {})
    pp 'いいいいいいいいいいいいいいいいいいいいいいいいい'
    @token = token
    devise_mail(record, :email_change_confirmation_instructions, opts)
  end
end
