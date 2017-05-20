class CoverLetterEmailForm
  include ActiveModel::Model

  attr_accessor :subject, :message, :email_to, :attachment
  delegate :original_filename, :tempfile, to: :attachment, allow_nil: true

  validates :subject, :message, :email_to, presence: true

  def attachment?
    !attachment.nil? && !attachment.size.zero?
  end
end