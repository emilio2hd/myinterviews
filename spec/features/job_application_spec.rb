require 'rails_helper'
require_relative 'shared/components_helpers'

feature 'Creating new job application', js: true do
  given(:job_application) do
    {
      position_name: FFaker::Job.title,
      company_name: FFaker::CompanyIT.name,
      company_location: FFaker::Address.city,
      application_status: 'Ongoing',
      began_at: '2020-12-10',
      application_cv_url: FFaker::Internet.http_url,
      tech_stack: %w[ruby rails rspec angular],
      job_description: FFaker::Lorem.sentences.join(' '),
      cover_letter: FFaker::Lorem.sentences.join(' '),
      feedback: FFaker::Lorem.sentences.join(' ')
    }
  end

  scenario 'With correct data' do
    visit '/job-application/new'

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Job Application'
      expect(page).to have_content 'New'
    end

    fill_job_application(job_application)
    find('[data-testid="saveButton"]').click

    has_notification_with?('successfully created')

    within '[data-testid="jobApplicationTable"]' do
      expect(page).to have_content job_application[:position_name]
      expect(page).to have_content job_application[:company_name]
    end
  end
end

feature 'Editing job application', js: true do
  given!(:application_sent) { create(:application_sent) }
  given(:job_application_changes) do
    {
      position_name: FFaker::Job.title,
      company_name: FFaker::CompanyIT.name,
      application_status: 'Ongoing'
    }
  end

  scenario 'Changing position, company and status' do
    visit "/job-application/#{application_sent.id}/edit"

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Job Application'
      expect(page).to have_content 'Edit'
    end

    fill_job_application(job_application_changes)
    find('[data-testid="saveButton"]').click

    has_notification_with?('successfully updated')

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Job Application'
      expect(page).to have_content job_application_changes[:position_name]
    end

    expect(page).to have_content job_application_changes[:company_name]
  end
end

feature 'View job application', js: true do
  given!(:application) { create(:application_sent) }
  given!(:application_with_interviews) { create(:application_with_interviews) }

  scenario 'Without interviews' do
    visit "/job-application/#{application.id}"

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Job Application'
      expect(page).to have_content application.position
    end

    timeline_link = find('[data-testid="seeTimelineButton"]')
    expect(timeline_link).to have_content('Sent')
    timeline_link.click

    expect(page).to have_content 'Application Timeline'

    within '[data-testid="timeline"]' do
      expect(page).to have_selector('.ant-timeline-item', count: 2)
      expect(page).to have_content "Application sent to #{application.company}"
      expect(page).to have_content 'Waiting for interviews'
    end
  end

  scenario 'With interviews' do
    visit "/job-application/#{application_with_interviews.id}"

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Job Application'
      expect(page).to have_content application_with_interviews.position
    end

    timeline_link = find('[data-testid="seeTimelineButton"]')
    expect(timeline_link).to have_content('Sent')
    timeline_link.click

    expect(page).to have_content 'Application Timeline'

    within '[data-testid="timeline"]' do
      expect(page).to have_selector('.ant-timeline-item', count: 4)
      expect(page).to have_content "Application sent to #{application_with_interviews.company}"
      expect(page).to_not have_content 'Waiting for interviews'
    end
  end
end

feature 'Delete job application', js: true do
  given!(:application) { create(:application_sent) }
  given!(:application_with_interviews) { create(:application_with_interviews) }

  scenario 'From job application view' do
    visit "/job-application/#{application.id}"

    expect(page).to have_content 'Job Application'

    expect(page).to have_content application.position
    expect(page).to have_content application.company

    find('[data-testid="deleteButton"]').click

    confirm_delete
    has_notification_with?('successfully deleted')

    expect(page).to have_content 'Job Application'

    within '[data-testid="jobApplicationTable"]' do
      expect(page).to_not have_content application.position
    end
  end
end

# rubocop:disable Metrics/AbcSize
def fill_job_application(**kargs)
  fill_in 'jobApplicationPosition', with: kargs[:position_name] if kargs.key? :position_name
  fill_in 'jobApplicationCompany', with: kargs[:company_name] if kargs.key? :company_name
  fill_in 'jobApplicationLocation', with: kargs[:company_location] if kargs.key? :company_location

  if kargs.key? :application_status
    find('[data-testid="jobApplicationStatus"]').click
    find('.ant-select-item-option-content', text: kargs[:application_status]).click
  end

  type_date '[data-testid="jobApplicationBeganAt"]', kargs[:began_at] if kargs.key? :began_at

  fill_in 'jobApplicationCvUrl', with: kargs[:application_cv_url] if kargs.key? :application_cv_url

  if kargs.key? :tech_stack
    find('[data-testid="jobApplicationTechStackList"]').find('input').click
    kargs[:tech_stack].each do |tech|
      find('[data-testid="jobApplicationTechStackList"]').find('input').send_keys tech, :enter
    end
    find('[data-testid="jobApplicationTechStackList"]').find('input').send_keys :tab
  end

  fill_in_ckeditor('[data-testid="jobApplicationJobDescription"]', with: kargs[:job_description]) if kargs.key? :job_description
  fill_in_ckeditor('[data-testid="jobApplicationCoverLetter"]', with: kargs[:cover_letter]) if kargs.key? :cover_letter
  fill_in_ckeditor('[data-testid="jobApplicationOverallFeedback"]', with: kargs[:feedback]) if kargs.key? :feedback
end
# rubocop:enable Metrics/AbcSize