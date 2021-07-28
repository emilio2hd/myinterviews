require 'rails_helper'

feature "Dashboard" do
  scenario 'With correct data' do
    visit root_path
    expect(find('.content-header').find('h1')).to have_content('Dashboard')
  end
end