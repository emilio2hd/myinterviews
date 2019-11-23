require 'rails_helper'

RSpec.describe CoverLetterMailer, type: :mailer do
  describe 'presentation_email' do
    let(:cover_letter) { create(:cover_letter) }
    let(:attachment) { Rack::Test::UploadedFile.new(Rails.root.join('public', 'robots.txt')) }
    let(:cover_letter_email_params) do
      { subject: 'New Job Position', message: cover_letter.content, email_to: 'hr@supercoolcompany.com' }
    end
    let(:cover_letter_email_form) { CoverLetterEmailForm.new(cover_letter_email_params) }
    let(:email_settings) { { address: 'localhost', port: 1025, from: 'me@test.com' } }
    let(:mail) { CoverLetterMailer.presentation_email(cover_letter_email_form, email_settings) }

    it 'renders the headers' do
      expect(mail.subject).to eq(cover_letter_email_params[:subject])
      expect(mail.to).to eq([cover_letter_email_params[:email_to]])
      expect(mail.from).to eq([email_settings[:from]])
    end

    it 'renders the body' do
      expect(mail.body).to match(cover_letter.content)
    end

    it 'contains custom delivery settings' do
      expect(mail.delivery_method.settings).to match(email_settings)
    end

    it 'should not have attachments' do
      expect(mail.attachments.empty?).to be_truthy
    end

    context 'with attachment' do
      let(:cover_letter_email_form) { CoverLetterEmailForm.new(cover_letter_email_params.merge(attachment: attachment)) }

      it 'should have attachments' do
        expect(mail.attachments['robots.txt']).not_to be_nil
      end
    end
  end
end
