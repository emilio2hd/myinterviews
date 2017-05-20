class Interview < ApplicationRecord
  enum type_of: [ :talk, :technical ]

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
