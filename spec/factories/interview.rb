# frozen_string_literal: true

FactoryBot.define do
  factory :talk_interview, class: Interview do
    interviewer_name { FFaker::Name.name }
    interviewer_email { FFaker::Internet.email }
    at { FFaker::Time.date }
    type_of :talk

    factory :with_application_sent, class: Interview do
      association :my_application, factory: :application_sent
    end
  end
end
