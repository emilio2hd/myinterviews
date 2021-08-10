# frozen_string_literal: true

FactoryBot.define do
  factory :local_email_setting, class: Setting do
    var :email
    value do
      { from: 'me@test.com', user_name: '', password: '', domain: '', address: 'localhost',
        port: 1025, enable_starttls_auto: '', authentication: '' }
    end

    factory :smtp_email_setting, class: Setting do
      value do
        { from: 'me@test.com', user_name: 'user@smtpsrv.com', password: '123456', domain: 'smtpsrv.com',
          address: 'smtp.smtpsrv.com', port: 25, enable_starttls_auto: true, authentication: 'plain' }
      end
    end
  end
end
