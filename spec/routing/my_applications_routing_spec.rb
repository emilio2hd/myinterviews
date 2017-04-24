require 'rails_helper'

RSpec.describe MyApplicationsController, type: :routing do
  describe 'routing' do

    it 'routes to #index' do
      expect(get: '/my_applications').to route_to('my_applications#index')
    end

    it 'routes to #new' do
      expect(get: '/my_applications/new').to route_to('my_applications#new')
    end

    it 'routes to #show' do
      expect(get: '/my_applications/1').to route_to('my_applications#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/my_applications/1/edit').to route_to('my_applications#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/my_applications').to route_to('my_applications#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/my_applications/1').to route_to('my_applications#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/my_applications/1').to route_to('my_applications#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/my_applications/1').to route_to('my_applications#destroy', id: '1')
    end

  end
end
