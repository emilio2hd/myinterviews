# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CoverLettersController, type: :controller do
  let(:valid_attributes) { attributes_for(:cover_letter) }
  let(:invalid_attributes) { attributes_for(:cover_letter).merge(title: nil) }

  describe 'GET #index' do
    it 'assigns all cover_letters as @cover_letters' do
      cover_letter = CoverLetter.create! valid_attributes
      get :index, params: {}
      expect(assigns(:cover_letters)).to eq([cover_letter])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested cover_letter as @cover_letter' do
      cover_letter = CoverLetter.create! valid_attributes
      get :show, params: { id: cover_letter.to_param }
      expect(assigns(:cover_letter)).to eq(cover_letter)
    end
  end

  describe 'GET #new' do
    it 'assigns a new cover_letter as @cover_letter' do
      get :new, params: {}
      expect(assigns(:cover_letter)).to be_a_new(CoverLetter)
    end
  end

  describe 'GET #duplicate' do
    it 'assigns a new cover_letter as @cover_letter' do
      cover_letter = CoverLetter.create! valid_attributes

      get :duplicate, params: { id: cover_letter.to_param }

      expect(assigns(:cover_letter).title).to eq("#{cover_letter.title} [Copy]")
      expect(assigns(:cover_letter).content).to eq(cover_letter.content)
      expect(assigns(:cover_letter).persisted?).to be_falsey
    end
  end

  describe 'GET #new_email' do
    before do
      @cover_letter = CoverLetter.create! valid_attributes
      setting_email_form = SettingEmailForm.new(address: 'localhost', port: 1025, from: 'me@test.com')
      Setting.new(var: :email, value: setting_email_form.serializable_hash.with_indifferent_access).save
    end

    after { Setting.destroy(:email) if Setting.email }

    it 'assigns a cover letter content as message' do
      get :new_email, params: { id: @cover_letter.to_param }

      expect(assigns(:cover_letter_email_form).message).to eq(@cover_letter.content)
    end

    context 'with email settings' do
      it 'should not assigns a flash alert alerting about no email settings found' do
        get :new_email, params: { id: @cover_letter.to_param }

        is_expected.not_to set_flash[:alert]
      end
    end

    context 'with no email settings' do
      it 'should assigns a flash alert alerting about no email settings found' do
        Setting.destroy(:email)

        get :new_email, params: { id: @cover_letter.to_param }

        is_expected.to set_flash[:alert]
      end
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested cover_letter as @cover_letter' do
      cover_letter = CoverLetter.create! valid_attributes
      get :edit, params: { id: cover_letter.to_param }
      expect(assigns(:cover_letter)).to eq(cover_letter)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new CoverLetter' do
        expect { post :create, params: { cover_letter: valid_attributes } }.to change(CoverLetter, :count).by(1)
      end

      it 'assigns a newly created cover_letter as @cover_letter' do
        post :create, params: { cover_letter: valid_attributes }
        expect(assigns(:cover_letter)).to be_a(CoverLetter)
        expect(assigns(:cover_letter)).to be_persisted
      end

      it 'redirects to the created cover_letter' do
        post :create, params: { cover_letter: valid_attributes }
        expect(response).to redirect_to(CoverLetter.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved cover_letter as @cover_letter' do
        post :create, params: { cover_letter: invalid_attributes }
        expect(assigns(:cover_letter)).to be_a_new(CoverLetter)
      end

      it "re-renders the 'new' template" do
        post :create, params: { cover_letter: invalid_attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'POST #send_email' do
    let(:cover_letter) { create(:cover_letter) }
    let(:valid_email_attributes) do
      { subject: 'New job position', message: cover_letter.content, email_to: 'hr@supercoolcompany.com',
        attachment: fixture_file_upload(Rails.root.join('public', 'robots.txt')) }
    end
    let(:invalid_email_attributes) { valid_email_attributes.merge(email_to: nil) }
    let(:email_params) { { id: cover_letter.to_param, cover_letter_email_form: valid_email_attributes } }

    before { create(:local_email_setting) }

    after(:each) { ActionMailer::Base.deliveries.clear }

    context 'with no email settings' do
      before { Setting.destroy(:email) }

      it 'should not send the email' do
        expect { post :send_email, params: email_params }.not_to change(ActionMailer::Base.deliveries, :count)
      end

      it "re-renders the 'new_email' template" do
        post :send_email, params: email_params
        expect(response).to render_template('new_email')
      end

      it 'should assigns a flash alert alerting about no email settings found' do
        post :send_email, params: email_params
        is_expected.to set_flash[:alert]
      end
    end

    context 'with valid params' do
      it 'should send the email' do
        expect { post :send_email, params: email_params }.to change(ActionMailer::Base.deliveries, :count).by(1)
      end

      it 'redirects to cover_letter' do
        post :send_email, params: email_params
        expect(response).to redirect_to(cover_letter)
      end
    end

    context 'with invalid params' do
      let(:email_params) { { id: cover_letter.to_param, cover_letter_email_form: invalid_email_attributes } }

      it 'should not send the email' do
        expect { post :send_email, params: email_params }.not_to change(ActionMailer::Base.deliveries, :count)
      end

      it 'assigns a newly created but unsaved cover_letter_email_form as @cover_letter_email_form' do
        post :send_email, params: email_params
        expect(assigns(:cover_letter_email_form)).not_to be_nil
      end

      it "re-renders the 'new_email' template" do
        post :send_email, params: email_params
        expect(response).to render_template('new_email')
      end
    end

    context 'with invalid settings' do
      before do
        expect(CoverLetterMailer).to receive(:presentation_email)
          .and_raise(Net::SMTPAuthenticationError, 'Password not accepted')

        post :send_email, params: email_params
      end

      it 'should send the email' do
        is_expected.to set_flash[:alert]
      end

      it "re-renders the 'new_email' template" do
        expect(response).to render_template('new_email')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { valid_attributes.merge(title: "#{valid_attributes[:title]} edited") }

      it 'updates the requested cover_letter' do
        cover_letter = CoverLetter.create! valid_attributes
        put :update, params: { id: cover_letter.to_param, cover_letter: new_attributes }
        cover_letter.reload
        expect(cover_letter.title).to eq("#{valid_attributes[:title]} edited")
      end

      it 'assigns the requested cover_letter as @cover_letter' do
        cover_letter = CoverLetter.create! valid_attributes
        put :update, params: { id: cover_letter.to_param, cover_letter: valid_attributes }
        expect(assigns(:cover_letter)).to eq(cover_letter)
      end

      it 'redirects to the cover_letter' do
        cover_letter = CoverLetter.create! valid_attributes
        put :update, params: { id: cover_letter.to_param, cover_letter: valid_attributes }
        expect(response).to redirect_to(cover_letter)
      end
    end

    context 'with invalid params' do
      it 'assigns the cover_letter as @cover_letter' do
        cover_letter = CoverLetter.create! valid_attributes
        put :update, params: { id: cover_letter.to_param, cover_letter: invalid_attributes }
        expect(assigns(:cover_letter)).to eq(cover_letter)
      end

      it "re-renders the 'edit' template" do
        cover_letter = CoverLetter.create! valid_attributes
        put :update, params: { id: cover_letter.to_param, cover_letter: invalid_attributes }
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested cover_letter' do
      cover_letter = CoverLetter.create! valid_attributes
      expect { delete :destroy, params: { id: cover_letter.to_param } }.to change(CoverLetter, :count).by(-1)
    end

    it 'redirects to the cover_letters list' do
      cover_letter = CoverLetter.create! valid_attributes
      delete :destroy, params: { id: cover_letter.to_param }
      expect(response).to redirect_to(cover_letters_url)
    end
  end
end
