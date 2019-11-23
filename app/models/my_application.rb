# == Schema Information
#
# Table name: my_applications
#
#  id               :integer          not null, primary key
#  began_at         :date             not null
#  company          :string(255)      not null
#  cover_letter     :text
#  cv_url           :string(255)
#  job_description  :text
#  location         :string(255)      not null
#  lock_version     :integer          default(0), not null
#  overall_feedback :text             default("")
#  position         :string(255)      not null
#  status           :integer          default("sent")
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class MyApplication < ApplicationRecord
  enum status: { sent: 0, no_answer: 1, ongoing: 2, canceled: 3, accepted: 4, refused: 5 }

  validates :position, :company, :began_at, :location, presence: true
  validates :position, :company, :location, :cv_url, length: { maximum: 255 }

  acts_as_taggable_on :tech_stack

  scope :ordered_by_last, -> { order(began_at: :desc) }
  scope :last_10, -> { ordered_by_last.limit(10) }

  before_destroy :destroy_all_interviews

  def description
    "#{position} - #{company}"
  end

  private

  def destroy_all_interviews
    Interview.all_from_application(id).delete_all
  end
end
