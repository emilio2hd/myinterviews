require 'rails_helper'

RSpec.describe SettingsController, type: :controller do
  before { Rails.cache.delete('rails_settings_cached//email') }

  describe 'GET #index' do
    context 'with no existing setting' do
      before { get :index, params: { format: :json } }

      it 'assigns the email setting as @setting_email_form' do
        expect(assigns(:setting_email_form)).to be_a_kind_of(SettingEmailForm)
      end

      it 'all properties should be blank' do
        assigns(:setting_email_form).serializable_hash.each { |_, value| expect(value).to be_blank }
      end
    end

    context 'with existing setting ' do
      before do
        @smtp_email_setting = create(:smtp_email_setting)
        get :index, params: { format: :json }
      end

      it 'assigns the email setting as @setting_email_form' do
        expect(assigns(:setting_email_form)).to be_a_kind_of(SettingEmailForm)
      end

      it 'should assigns email settings values to setting_email_form' do
        form_properties = assigns(:setting_email_form).serializable_hash.with_indifferent_access

        @smtp_email_setting.value.except(:password).each do |key, value|
          expect(form_properties[key].to_s).to eq(value.to_s)
        end
      end

      it 'should not assigns password value' do
        expect(assigns(:setting_email_form).password).to be_blank
      end
    end
  end

  describe 'GET #update_all' do
    context 'with valid params' do
      let(:email_attributes) { attributes_for(:smtp_email_setting)[:value] }
      let(:valid_params) { { setting: { email: email_attributes }, format: :json } }

      context 'with no existing setting' do
        it 'creates email setting' do
          expect { post :update_all, params: valid_params }
            .to change(Setting, :count).by(1)

          expect(response).to have_http_status(:ok)
          expect(Setting.email).to be_a_kind_of(Hash)
        end
      end

      context 'with existing setting' do
        let(:new_email_attributes) { attributes_for(:smtp_email_setting)[:value].merge(address: 'smtp.gmail.com') }
        let(:valid_params) { { setting: { email: new_email_attributes }, format: :json } }

        before { create(:smtp_email_setting) }

        it 'does not create a new email setting' do
          expect { post :update_all, params: valid_params }
            .to_not change(Setting, :count)

          expect(Setting.email[:address]).to eq(new_email_attributes[:address])
        end
      end
    end

    context 'with invalid params' do
      let(:email_attributes) { attributes_for(:smtp_email_setting)[:value] }

      before do
        post :update_all, params: { setting: { email: email_attributes.merge(address: nil) }, format: :json }
      end

      it 'assigns the email setting as @setting_email_form' do
        expect(assigns(:setting_email_form)).to be_a_kind_of(SettingEmailForm)
      end

      it 'the assigned @setting_email_form contains error' do
        expect(response).to have_http_status(:bad_request)
        expect(assigns(:setting_email_form).errors).to_not be_empty
      end
    end
  end
end
