class MyApplication < ApplicationRecord
  enum status: [ :sent, :no_answer, :ongoing, :canceled, :accepted, :refused ]

  validates :position, :company, :began_at, :location, :cv_url, presence: true
  validates :position, :company, :location, :cv_url, length: { maximum: 255 }

  acts_as_taggable_on :tech_stack
end
