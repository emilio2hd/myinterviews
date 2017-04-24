FactoryGirl.define do
  factory :application_sent, class: MyApplication do
    position { FFaker::Job.title }
    company { FFaker::CompanyIT.name }
    location { FFaker::Address.city }
    cv_url { FFaker::Internet.http_url }
    tech_stack_list 'ruby,rails,rspec,test'
    status 'sent'
    began_at { FFaker::Time.date }
  end
end
