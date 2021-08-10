# frozen_string_literal: true

require 'rails_helper'
require_relative 'feature_helper'

feature 'Creating new job application' do
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
    visit new_my_application_path

    expect(content_header)
      .to have_content('My Applications')
      .and have_content('New')

    fill_job_application(job_application)
    click_on 'myApplicationSaveButton'

    has_message_alert_with? 'successfully created'

    expect(content_header)
      .to have_content('My Applications')
      .and have_content(job_application[:position_name])
  end
end

feature 'Editing job application' do
  given!(:application_sent) { create(:application_sent) }
  given(:job_application_changes) do
    {
      position_name: FFaker::Job.title,
      company_name: FFaker::CompanyIT.name,
      application_status: 'Ongoing'
    }
  end

  scenario 'Changing position, company and status' do
    visit edit_my_application_path(application_sent)

    expect(content_header)
      .to have_content('My Applications')
      .and have_content('Editing')

    fill_job_application(job_application_changes)
    click_on 'myApplicationSaveButton'

    has_message_alert_with? 'successfully updated'

    expect(content_header)
      .to have_content('My Applications')
      .and have_content(job_application_changes[:position_name])
  end
end

feature 'View job application' do
  given!(:application) { create(:application_sent) }
  given!(:application_with_interviews) { create(:application_with_interviews) }

  scenario 'Without interviews' do
    visit my_application_path(application)

    expect(content_header)
      .to have_content('My Applications')
      .and have_content(application.position)

    within '[data-testid="myApplicationDetails"]' do
      expect(page).to have_content(application.status)
      expect(page).to have_css('.active[data-testid="applicationFeedback"]')
      expect(page).to have_selector '[data-testid="applicationInterviews"]', text: 'There are no interviews'
    end
  end

  scenario 'With interviews' do
    visit my_application_path(application_with_interviews)

    expect(content_header)
      .to have_content('My Applications')
      .and have_content(application_with_interviews.position)

    interview_count = Interview.all_from_application(application_with_interviews.id).count
    within '[data-testid="myApplicationDetails"]' do
      expect(page).not_to have_selector '[data-testid="applicationInterviews"]', text: 'There are no interviews'
      expect(page).to have_selector('[data-testid="interviewsTimeline"] .time-label', count: interview_count)
    end
  end
end

feature 'Delete job application' do
  given!(:application) { create(:application_sent) }
  given!(:application_with_interviews) { create(:application_with_interviews) }

  scenario 'From job application view' do
    visit my_application_path(application)

    expect(content_header).to have_content('My Applications')

    expect(page).to have_content application.position
    expect(page).to have_content application.company

    accept_alert do
      click_on 'myApplicationDeleteButton'
    end

    has_message_alert_with?('successfully destroyed')

    expect(content_header).to have_content('My Applications')

    within '[data-testid="myApplicationTable"]' do
      expect(page).to_not have_content application.position
    end
  end
end

def fill_job_application(**kargs)
  fill_in 'applicationPosition', with: kargs[:position_name] if kargs.key? :position_name
  fill_in 'applicationCompany', with: kargs[:company_name] if kargs.key? :company_name
  fill_in 'applicationLocation', with: kargs[:company_location] if kargs.key? :company_location

  select(kargs[:application_status], from: 'applicationStatus') if kargs.key? :application_status

  fill_in 'applicationBeganAt', with: kargs[:began_at] if kargs.key? :began_at
  fill_in 'applicationCvUrl', with: kargs[:application_cv_url] if kargs.key? :application_cv_url

  if kargs.key? :tech_stack
    select = find('[data-testid="applicationTechStackList"]').sibling('.select2')
    select.click

    within select do
      kargs[:tech_stack].each do |tech|
        find('input', visible: :all).send_keys tech, :enter
      end
    end
  end

  if kargs.key? :job_description
    page.execute_script("tinymce.get('my_application_job_description').setContent('#{kargs[:job_description]}')")
  end
  if kargs.key? :cover_letter
    page.execute_script("tinymce.get('my_application_cover_letter').setContent('#{kargs[:cover_letter]}')")
  end
  if kargs.key? :feedback
    page.execute_script("tinymce.get('my_application_overall_feedback').setContent('#{kargs[:feedback]}')")
  end
end
