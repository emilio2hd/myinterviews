FactoryGirl.define do
  factory :talk_interview, class: Interview do
    association :my_application, factory: :application_sent
    interviewer_name { FFaker::Name.name }
    interviewer_email { FFaker::Internet.email }
    at { FFaker::Time.date }
    type_of :talk
  end
end