FactoryBot.define do
  factory :cover_letter, class: CoverLetter do
    title { FFaker::Company.position }
    content { FFaker::HTMLIpsum.body }
  end
end
