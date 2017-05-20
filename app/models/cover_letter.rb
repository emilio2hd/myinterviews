class CoverLetter < ApplicationRecord
  validates :title, :content, presence: true
  validates :title, length: { maximum: 255 }
end
