class MyApplication < ApplicationRecord
  enum status: [ :sent, :no_answer, :ongoing, :canceled, :accepted, :refused ]

  validates :position, :company, :began_at, :location, :cv_url, presence: true
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
