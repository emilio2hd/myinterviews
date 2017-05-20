require 'rails_helper'

RSpec.describe Setting, type: :model do
  describe 'save email setting' do
    context 'with password' do
      let(:setting) { create(:local_email_setting) }
      let(:new_email_settings) { setting.value.merge(password: '123456') }

      it 'should encrypt the password' do
        expect(Cryptography).to receive(:encrypt).and_call_original
        Setting.merge!(:email, new_email_settings)
      end
    end

    context 'with blank password' do
      let(:setting) { create(:smtp_email_setting) }
      let(:new_email_settings) { setting.value.merge(password: '') }
      before { Setting.merge!(:email, new_email_settings) }

      it 'should not encrypt an blank password' do
        expect(Cryptography).to_not receive(:encrypt)
        expect(Setting.find_by(var: :email).value[:password]).to be_blank
      end
    end
  end

  describe 'load email setting' do
    context 'with encrypted password' do
      let(:raw_password) { '123456' }

      before do
        create(:smtp_email_setting)
        Setting.merge!(:email, password: raw_password)
      end

      it 'should decrypt password after load' do
        expect(Cryptography).to receive(:decrypt).and_call_original
        expect(Setting.find_by(var: :email).value[:password]).to eq(raw_password)
      end
    end

    context 'with blank password' do
      before { create(:local_email_setting) }

      it 'should not try decrypt a blank password after load' do
        expect(Cryptography).to_not receive(:decrypt)
        expect(Setting.find_by(var: :email).value[:password]).to be_blank
      end
    end
  end
end