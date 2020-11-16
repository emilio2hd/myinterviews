require 'rails_helper'

RSpec.describe MyApplicationsController, type: :controller do
  let(:valid_attributes) { attributes_for(:application_sent) }
  let(:invalid_attributes) { attributes_for(:application_sent).merge(position: nil) }

  describe 'GET #index' do
    it 'assigns all my_applications as @my_applications' do
      my_application = MyApplication.create! valid_attributes
      get :index, params: { format: :json }
      expect(assigns(:my_applications)).to eq([my_application])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested my_application as @my_application' do
      my_application = MyApplication.create! valid_attributes
      get :show, params: { id: my_application.to_param, format: :json }
      expect(assigns(:my_application)).to eq(my_application)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new MyApplication' do
        expect { post :create, params: { my_application: valid_attributes, format: :json } }
            .to change(MyApplication, :count).by(1)
      end

      it 'assigns a newly created my_application as @my_application' do
        post :create, params: { my_application: valid_attributes, format: :json }
        expect(assigns(:my_application)).to be_a(MyApplication)
        expect(assigns(:my_application)).to be_persisted
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved my_application as @my_application' do
        post :create, params: { my_application: invalid_attributes, format: :json }
        expect(assigns(:my_application)).to be_a_new(MyApplication)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { valid_attributes.merge(position: "#{valid_attributes[:position]} edited") }

      before do
        @my_application = MyApplication.create! new_attributes
        put :update, params: { id: @my_application.to_param, my_application: new_attributes, format: :json }
      end

      it 'updates the requested my_application' do
        @my_application.reload
        expect(@my_application.position).to eq("#{valid_attributes[:position]} edited")
      end

      it 'assigns the requested my_application as @my_application' do
        @my_application.reload
        expect(assigns(:my_application)).to eq(@my_application)
      end
    end

    context 'with invalid params' do
      before do
        @my_application = MyApplication.create! valid_attributes
        put :update, params: { id: @my_application.to_param, my_application: invalid_attributes, format: :json }
      end

      it 'assigns the my_application as @my_application' do
        expect(assigns(:my_application)).to eq(@my_application)
      end
    end
  end

  describe 'DELETE #destroy' do
    before { @my_application = MyApplication.create! valid_attributes }
    it 'destroys the requested my_application' do
      expect { delete :destroy, params: { id: @my_application.to_param, format: :json } }
          .to change(MyApplication, :count).by(-1)

      expect(response).to have_http_status(200)
    end
  end
end
