require 'rails_helper'

RSpec.describe CoverLetterEmailForm, type: :model do
  let(:attachment_param) { { attachment: Rack::Test::UploadedFile.new(Rails.root.join('public', 'robots.txt')) } }
  let(:cover_letter_email_params) { {} }

  it { is_expected.to validate_presence_of(:subject) }
  it { is_expected.to validate_presence_of(:message) }
  it { is_expected.to validate_presence_of(:email_to) }
  it { is_expected.to_not validate_presence_of(:attachment) }

  it { is_expected.to delegate_method(:original_filename).to(:attachment) }
  it { is_expected.to delegate_method(:tempfile).to(:attachment) }

  subject { CoverLetterEmailForm.new(cover_letter_email_params) }

  describe '#attachment?' do
    context 'with attachment' do
      let(:cover_letter_email_params) { attachment_param }

      it 'should return true' do
        expect(subject.attachment?).to be_truthy
      end
    end

    context 'with not attachment' do
      it 'should return false' do
        expect(subject.attachment?).to be_falsey
      end
    end
  end
end