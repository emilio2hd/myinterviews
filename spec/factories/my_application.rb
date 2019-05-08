FactoryBot.define do
  factory :application_sent, class: MyApplication do
    position { FFaker::Job.title }
    company { FFaker::CompanyIT.name }
    location { FFaker::Address.city }
    cv_url { FFaker::Internet.http_url }
    tech_stack_list 'ruby,rails,rspec,test'
    status 'sent'
    began_at { FFaker::Time.date }

    factory :application_with_interviews, class: MyApplication do
      transient { interviews_count 3 }

      after(:create) do |application, evaluator|
        create_list(:talk_interview, evaluator.interviews_count, my_application: application)
      end
    end
  end
end
