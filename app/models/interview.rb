# == Schema Information
#
# Table name: interviews
#
#  id                :integer          not null, primary key
#  at                :datetime         not null
#  feedback          :text
#  interviewer_email :string(255)
#  interviewer_name  :string(255)
#  lock_version      :integer          default(0), not null
#  notes             :text
#  type_of           :integer          default("talk"), not null
#  my_application_id :integer          not null
#
# Indexes
#
#  index_interviews_on_my_application_id  (my_application_id)
#
# Foreign Keys
#
#  fk_rails_...  (my_application_id => my_applications.id)
#

class Interview < ApplicationRecord
  enum type_of: { talk: 0, technical: 1 }

  validates :at, :type_of, :my_application, presence: true
  validates :interviewer_name, :interviewer_email, length: { maximum: 255 }

  belongs_to :my_application

  scope :ordered_by_last, -> { order(at: :desc) }
  scope :next_10, -> { ordered_by_last.limit(10) }
  scope :all_from_application, ->(application_id) { where(my_application_id: application_id) }

  def interviewer
    interviewer_name.to_s.empty? ? 'Unknown' : interviewer_name
  end

  def application
    "#{my_application.position} - #{my_application.company}"
  end
end
