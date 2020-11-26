require 'rails_helper'

feature 'Dashboard', js: true do
  let!(:applications) { create_list(:application_sent, 5) }
  let!(:interviews) { create_list(:talk_interview, 6) }

  before do
    visit '/'
    expect(page).to have_content 'Dashboard'
  end

  scenario 'List applications and interviews' do
    within '[data-testid="lastApplicationsTable"]' do
      expect(page).to have_selector('.ant-table-tbody .ant-table-row', count: applications.length)
    end

    within '[data-testid="lastInterviewTable"]' do
      expect(page).to have_selector('.ant-table-tbody .ant-table-row', count: interviews.length)
    end
  end

  scenario 'When user wants to view all applications' do
    within '[data-testid="listApplicationsCard"]' do
      page.click_link('View All Applications')
    end

    expect(page).to have_content 'Job Application'
  end

  scenario 'When user wants to view all interviews' do
    within '[data-testid="listInterviewsCard"]' do
      page.click_link('View All Interviews')
    end

    expect(page).to have_content 'Interview'
  end

  scenario 'When user wants to create new application' do
    within '[data-testid="listApplicationsCard"]' do
      page.click_link('New Application')
    end

    expect(page).to have_content 'Job Application'
    expect(page).to have_content 'New'
  end

  scenario 'When user wants to create new interview' do
    within '[data-testid="listInterviewsCard"]' do
      page.click_link('New Interview')
    end

    expect(page).to have_content 'Interview'
    expect(page).to have_content 'New'
  end
end
