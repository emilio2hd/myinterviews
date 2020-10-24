json.email do
  json.extract! @setting_email_form, :address, :authentication, :domain, :enable_starttls_auto, :from, :port, :reply_to, :user_name
end