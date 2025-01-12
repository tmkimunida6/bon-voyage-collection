class UserMailer < Devise::Mailer
  def email_change_confirmation_instructions(record, token, opts = {})
    @token = token
    devise_mail(record, :email_change_confirmation_instructions, opts)
  end
end
