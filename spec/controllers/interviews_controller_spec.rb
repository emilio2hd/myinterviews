require 'rails_helper'

RSpec.describe InterviewsController, type: :controller do
  let!(:my_application) { create(:application_sent) }
  let(:valid_attributes) { attributes_for(:talk_interview) }
  let(:valid_attributes_with_interview) { attributes_for(:talk_interview).merge(my_application_id: my_application.id) }
  let(:invalid_attributes) { attributes_for(:talk_interview).merge(at: nil) }

  describe 'GET #index' do
    it 'assigns all interviews as @interviews' do
      interview = Interview.create! valid_attributes

      get :index, params: { format: :json }

      expect(assigns(:interviews)).to eq([interview])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested interview as @interview' do
      interview = Interview.create! valid_attributes

      get :show, params: { id: interview.to_param, format: :json }

      expect(assigns(:interview)).to eq(interview)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Interview' do
        expect { post :create, params: { interview: valid_attributes, format: :json } }
          .to change(Interview, :count).by(1)
      end

      it 'assigns a newly created interview as @interview' do
        post :create, params: { interview: valid_attributes, format: :json }

        expect(response).to have_http_status(:ok)
        expect(assigns(:interview)).to be_a(Interview)
        expect(assigns(:interview)).to be_persisted
      end
    end

    context 'with application' do
      it 'creates a new interview with application' do
        expect { post :create, params: { interview: valid_attributes_with_interview, format: :json } }
          .to change(Interview, :count).by(1)
      end

      it 'assigns a newly created interview as @interview' do
        post :create, params: { interview: valid_attributes_with_interview, format: :json }

        expect(response).to have_http_status(:ok)
        expect(assigns(:interview)).to be_a(Interview)
        expect(assigns(:interview)).to be_persisted
        expect(assigns(:interview).my_application_id).to_not be_nil
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved interview as @interview' do
        post :create, params: { interview: invalid_attributes, format: :json }

        expect(response).to have_http_status(:bad_request)
        expect(assigns(:interview)).to be_a_new(Interview)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { valid_attributes.merge(interviewer_name: "#{valid_attributes[:interviewer_name]} edited") }

      it 'updates the requested interview' do
        interview = Interview.create! valid_attributes

        put :update, params: { id: interview.to_param, interview: new_attributes, format: :json }
        interview.reload

        expect(interview.interviewer_name).to eq("#{valid_attributes[:interviewer_name]} edited")
      end

      it 'assigns the requested interview as @interview' do
        interview = Interview.create! valid_attributes

        put :update, params: { id: interview.to_param, interview: valid_attributes, format: :json }

        expect(response).to have_http_status(:ok)
        expect(assigns(:interview)).to eq(interview)
      end
    end

    context 'associate application to interview' do
      it 'successfully associate to application' do
        interview = Interview.create! valid_attributes

        put :update, params: { id: interview.to_param, interview: valid_attributes.merge(my_application_id: my_application.id), format: :json }
        expect(response).to have_http_status(:ok)

        interview.reload

        expect(interview.my_application).to_not be_nil
      end
    end

    context 'with invalid params' do
      it 'assigns the interview as @interview' do
        interview = Interview.create! valid_attributes

        put :update, params: { id: interview.to_param, interview: invalid_attributes, format: :json }

        expect(response).to have_http_status(:bad_request)
        expect(assigns(:interview)).to eq(interview)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested interview' do
      interview = Interview.create! valid_attributes
      expect { delete :destroy, params: { id: interview.to_param, format: :json } }
        .to change(Interview, :count).by(-1)

      expect(response).to have_http_status(:ok)
    end
  end
end
