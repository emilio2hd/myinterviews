require 'rails_helper'

RSpec.describe SettingsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/settings').to route_to('settings#index')
    end

    it 'routes to #update_all via PATCH' do
      expect(patch: '/settings/update_all').to route_to('settings#update_all')
    end
  end
end
