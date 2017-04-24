require 'rails_helper'

RSpec.describe MyApplicationsController, type: :controller do
  let(:valid_attributes) { attributes_for(:application_sent) }
  let(:invalid_attributes) { attributes_for(:application_sent).merge(position: nil) }

  describe 'GET #index' do
    it 'assigns all my_applications as @my_applications' do
      my_application = MyApplication.create! valid_attributes
      get :index, params: {}
      expect(assigns(:my_applications)).to eq([my_application])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested my_application as @my_application' do
      my_application = MyApplication.create! valid_attributes
      get :show, params: { id: my_application.to_param }
      expect(assigns(:my_application)).to eq(my_application)
    end
  end

  describe 'GET #new' do
    it 'assigns a new my_application as @my_application' do
      get :new, params: {}
      expect(assigns(:my_application)).to be_a_new(MyApplication)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested my_application as @my_application' do
      my_application = MyApplication.create! valid_attributes
      get :edit, params: { id: my_application.to_param }
      expect(assigns(:my_application)).to eq(my_application)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new MyApplication' do
        expect { post :create, params: { my_application: valid_attributes } }.to change(MyApplication, :count).by(1)
      end

      it 'assigns a newly created my_application as @my_application' do
        post :create, params: { my_application: valid_attributes }
        expect(assigns(:my_application)).to be_a(MyApplication)
        expect(assigns(:my_application)).to be_persisted
      end

      it 'redirects to the created my_application' do
        post :create, params: { my_application: valid_attributes }
        expect(response).to redirect_to(MyApplication.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved my_application as @my_application' do
        post :create, params: { my_application: invalid_attributes }
        expect(assigns(:my_application)).to be_a_new(MyApplication)
      end

      it "re-renders the 'new' template" do
        post :create, params: { my_application: invalid_attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { valid_attributes.merge(position: "#{valid_attributes[:position]} edited") }

      before do
        @my_application = MyApplication.create! new_attributes
        put :update, params: { id: @my_application.to_param, my_application: new_attributes }
      end

      it 'updates the requested my_application' do
        @my_application.reload
        expect(@my_application.position).to eq("#{valid_attributes[:position]} edited")
      end

      it 'assigns the requested my_application as @my_application' do
        @my_application.reload
        expect(assigns(:my_application)).to eq(@my_application)
      end

      it 'redirects to the my_application' do
        expect(response).to redirect_to(@my_application)
      end
    end

    context 'with invalid params' do
      before do
        @my_application = MyApplication.create! valid_attributes
        put :update, params: { id: @my_application.to_param, my_application: invalid_attributes }
      end

      it 'assigns the my_application as @my_application' do
        expect(assigns(:my_application)).to eq(@my_application)
      end

      it "re-renders the 'edit' template" do
        expect(response).to render_template('edit')
      end
    end

    context 'with stale object' do
      before do
        @my_application = MyApplication.create! valid_attributes

        @updated = MyApplication.find(@my_application.id)
        @updated.update(position: "#{valid_attributes[:position]} another edition")

        attributes = valid_attributes.merge(lock_version: @my_application.lock_version)
        put :update, params: { id: @my_application.to_param, my_application: attributes }
      end

      it 'assigns the my_application with a updated record' do
        expect(assigns(:my_application)).to eq(@updated)
      end

      it 'should assign flash error' do
        expect(flash.now[:error]).to include('user has made a change to that record')
      end

      it "re-renders the 'edit' template" do
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    before { @my_application = MyApplication.create! valid_attributes }
    it 'destroys the requested my_application' do
      expect { delete :destroy, params: { id: @my_application.to_param } }.to change(MyApplication, :count).by(-1)
    end

    it 'redirects to the my_applications list' do
      delete :destroy, params: { id: @my_application.to_param }
      expect(response).to redirect_to(my_applications_url)
    end
  end
end
