require 'rails_helper'
require_relative 'feature_helper'

feature 'Dashboard' do
  let!(:applications) { create_list(:application_sent, 5) }
  let!(:interviews) { create_list(:talk_interview, 6) }

  before do
    visit root_path
    expect(content_header).to have_content('Dashboard')
  end

  scenario 'List applications and interviews' do
    within '[data-testid="lastApplicationsTable"]' do
      expect(page).to have_selector('tbody tr', count: applications.length)
    end

    within '[data-testid="lastInterviewTable"]' do
      expect(page).to have_selector('tbody tr', count: interviews.length)
    end
  end

  scenario 'When user wants to view all applications' do
    within '[data-testid="listApplicationsBox"]' do
      page.click_link('View All Applications')
    end

    expect(page).to have_content 'My Applications'
  end

  scenario 'When user wants to view all interviews' do
    within '[data-testid="listInterviewsBox"]' do
      page.click_link('View All Interviews')
    end

    expect(content_header).to have_content('Interview')
  end

  scenario 'When user wants to create new application' do
    within '[data-testid="listApplicationsBox"]' do
      page.click_link('New Application')
    end

    expect(content_header)
        .to have_content('My Applications')
        .and have_content('New')
  end

  scenario 'When user wants to create new interview' do
    within '[data-testid="listInterviewsBox"]' do
      page.click_link('New Interview')
    end

    expect(content_header)
        .to have_content('Interview')
        .and have_content('New')
  end
end