if Rails.env.production?
  Rails.application.config.session_store :cookie_store, key: "_myapp_session", expire_after: 2.weeks, domain: "souvenir-cszk.onrender.com"
else
  Rails.application.config.session_store :cookie_store, key: "_myapp_session", domain: "localhost"
end
