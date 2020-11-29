require 'rails_helper'

RSpec.describe CoverLettersController, type: :controller do
  let(:valid_attributes) { attributes_for(:cover_letter) }
  let(:invalid_attributes) { attributes_for(:cover_letter).merge(title: nil) }

  describe 'GET #index' do
    it 'assigns all cover_letters as @cover_letters' do
      cover_letter = CoverLetter.create! valid_attributes

      get :index, params: { format: :json }

      expect(assigns(:cover_letters)).to eq([cover_letter])
    end
  end

  describe 'GET #show' do
    let(:cover_letter) { create(:cover_letter) }

    it 'assigns the requested cover_letter as @cover_letter' do
      get :show, params: { id: cover_letter.to_param, format: :json }

      expect(assigns(:cover_letter)).to eq(cover_letter)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new CoverLetter' do
        expect { post :create, params: { cover_letter: valid_attributes, format: :json } }
          .to change(CoverLetter, :count).by(1)
      end

      it 'assigns a newly created cover_letter as @cover_letter' do
        post :create, params: { cover_letter: valid_attributes, format: :json }

        expect(response).to have_http_status(:ok)
        expect(assigns(:cover_letter)).to be_a(CoverLetter)
        expect(assigns(:cover_letter)).to be_persisted
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved cover_letter as @cover_letter' do
        post :create, params: { cover_letter: invalid_attributes, format: :json }

        expect(response).to have_http_status(:bad_request)
        expect(assigns(:cover_letter)).to be_a_new(CoverLetter)
      end
    end
  end

  describe 'POST #send_email' do
    let(:cover_letter) { create(:cover_letter) }
    let(:valid_email_attributes) do
      { subject: 'New job position', message: cover_letter.content, email_to: 'hr@supercoolcompany.com',
        attachment: fixture_file_upload(Rails.root.join('spec', 'mailers', 'attachment', 'attachment_test.txt')) }
    end
    let(:invalid_email_attributes) { valid_email_attributes.merge(email_to: nil) }
    let(:email_params) { { id: cover_letter.to_param, cover_letter_email_form: valid_email_attributes } }

    before { create(:local_email_setting) }

    after(:each) { ActionMailer::Base.deliveries.clear }

    context 'with no email settings' do
      before { Setting.destroy(:email) }

      it 'should not send the email and return error message' do
        expect { post :send_email, params: email_params, format: :json }
          .not_to change(ActionMailer::Base.deliveries, :count)

        expect(json_body['message']).to eq("The email was not sent. You don't have the email settings configured")
      end
    end

    context 'with valid params' do
      it 'should send the email' do
        expect { post :send_email, params: email_params, format: :json }
          .to change(ActionMailer::Base.deliveries, :count).by(1)

        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      let(:email_params) do
        { id: cover_letter.to_param, cover_letter_email_form: invalid_email_attributes, format: :json }
      end

      it 'should not send the email' do
        expect { post :send_email, params: email_params }
          .not_to change(ActionMailer::Base.deliveries, :count)
      end

      it 'assigns a newly created but unsaved cover_letter_email_form as @cover_letter_email_form' do
        post :send_email, params: email_params

        expect(response).to have_http_status(:bad_request)
        expect(assigns(:cover_letter_email_form)).not_to be_nil
      end
    end

    context 'with invalid settings' do
      before do
        expect(CoverLetterMailer).to receive(:presentation_email)
          .and_raise(Net::SMTPAuthenticationError, 'Password not accepted')

        post :send_email, params: email_params, format: :json
      end

      it 'should not send the email' do
        expect(response).to have_http_status(:internal_server_error)
        expect(json_body['message']).to eq('An error has occurred. The email was not sent')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { valid_attributes.merge(title: "#{valid_attributes[:title]} edited") }

      it 'updates the requested cover_letter' do
        cover_letter = CoverLetter.create! valid_attributes

        put :update, params: { id: cover_letter.to_param, cover_letter: new_attributes, format: :json }
        cover_letter.reload

        expect(cover_letter.title).to eq("#{valid_attributes[:title]} edited")
      end

      it 'assigns the requested cover_letter as @cover_letter' do
        cover_letter = CoverLetter.create! valid_attributes

        put :update, params: { id: cover_letter.to_param, cover_letter: valid_attributes, format: :json }

        expect(response).to have_http_status(:ok)
        expect(assigns(:cover_letter)).to eq(cover_letter)
      end
    end

    context 'with invalid params' do
      it 'assigns the cover_letter as @cover_letter' do
        cover_letter = CoverLetter.create! valid_attributes

        put :update, params: { id: cover_letter.to_param, cover_letter: invalid_attributes, format: :json }

        expect(response).to have_http_status(:bad_request)
        expect(assigns(:cover_letter)).to eq(cover_letter)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested cover_letter' do
      cover_letter = CoverLetter.create! valid_attributes

      expect { delete :destroy, params: { id: cover_letter.to_param, format: :json } }
        .to change(CoverLetter, :count).by(-1)

      expect(response).to have_http_status(:ok)
    end
  end
end
