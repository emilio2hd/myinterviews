require 'rails_helper'

RSpec.describe SettingEmailForm, type: :model do
  it { is_expected.to validate_presence_of(:address) }
  it { is_expected.to validate_presence_of(:port) }
  it { is_expected.to validate_presence_of(:from) }

  it { is_expected.to_not validate_presence_of(:reply_to) }
  it { is_expected.to_not validate_presence_of(:user_name) }
  it { is_expected.to_not validate_presence_of(:password) }
  it { is_expected.to_not validate_presence_of(:domain) }
  it { is_expected.to_not validate_presence_of(:enable_starttls_auto) }
  it { is_expected.to_not validate_presence_of(:authentication) }

  it { is_expected.to validate_numericality_of(:port) }

  it { is_expected.to allow_values('me@mail.com', 'me-me@mail.com', 'me_me@mail.com', 'me.me@mail.com').for(:from) }
  it { is_expected.to_not allow_values('me st@mail.com', 'me@@mail.com', 'me@mail..com', 'me@mail').for(:from) }

  describe '#serializable_hash' do
    let(:email_attributes) { attributes_for(:smtp_email_setting)[:value] }
    let(:form_properties) { SettingEmailForm.new(email_attributes).serializable_hash.symbolize_keys }

    it 'return a hash with form attributes' do
      email_attributes.each { |key, value| expect(form_properties[key].to_s).to eq(value.to_s) }
    end
  end
end