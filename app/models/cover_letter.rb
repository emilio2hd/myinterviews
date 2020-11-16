# == Schema Information
#
# Table name: cover_letters
#
#  id           :integer          not null, primary key
#  content      :text
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class CoverLetter < ApplicationRecord
  validates :title, :content, presence: true
  validates :title, length: { maximum: 255 }
end
