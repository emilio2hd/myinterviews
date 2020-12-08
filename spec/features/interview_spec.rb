require 'rails_helper'
require_relative 'shared/components_helpers'

feature 'Creating new interview', js: true do
  given!(:application) { create(:application_sent) }
  given(:interview) do
    {
      interviewer_name: FFaker::Name.name,
      interviewer_email: FFaker::Internet.email,
      interview_type: 'Technical',
      interview_date: '2020-12-10 21:51',
      interview_notes: FFaker::Lorem.sentences.join(' '),
      interview_feedback: FFaker::Lorem.sentences.join(' ')
    }
  end

  before do
    visit '/interview'

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Interview'
    end

    click_on('newButton')

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Interview'
      expect(page).to have_content 'New'
    end
  end

  scenario 'With no application' do
    fill_interview(interview)

    find('[data-testid="saveButton"]').click

    has_notification_with?('successfully created')

    within '[data-testid="interviewTable"]' do
      expect(page).to have_content interview[:interviewer_name]
    end
  end

  scenario 'With application' do
    fill_interview(interview.merge(application_position: application.position))
    find('[data-testid="saveButton"]').click

    has_notification_with?('successfully created')

    within '[data-testid="interviewTable"]' do
      expect(page).to have_content interview[:interviewer_name]
      expect(page).to have_content application.position
      expect(page).to have_content application.company
    end
  end
end

feature 'View interview', js: true do
  let(:feedback) { FFaker::Lorem.sentences.join(' ') }
  let(:notes) { FFaker::Lorem.sentences.join(' ') }

  scenario 'Without application' do
    interview = create(:talk_interview, feedback: feedback, notes: notes)

    visit "/interview/#{interview.id}"
    expect(page).to have_content 'Interview'

    expect(page).to have_content interview.interviewer_name
    expect(page).to have_content interview.interviewer_email

    application_description = find('.ant-descriptions-item-label', text: 'Application').sibling('.ant-descriptions-item-content')
    expect(application_description).to have_content 'None'

    expect(page).to have_content feedback

    find('.ant-tabs-tab', text: 'Notes').click

    expect(page).to have_content notes
  end

  scenario 'With application' do
    interview = create(:with_application_sent, feedback: feedback, notes: notes)

    visit "/interview/#{interview.id}"
    expect(page).to have_content 'Interview'

    expect(page).to have_content interview.interviewer_name
    expect(page).to have_content interview.interviewer_email

    application_description = find('.ant-descriptions-item-label', text: 'Application').sibling('.ant-descriptions-item-content')
    expect(application_description).to have_content interview.my_application.position
    expect(application_description).to have_content interview.my_application.company

    expect(page).to have_content feedback

    find('.ant-tabs-tab', text: 'Notes').click

    expect(page).to have_content notes
  end
end

feature 'Editing existing interview', js: true do
  let(:feedback) { FFaker::Lorem.sentences.join(' ') }
  let(:notes) { FFaker::Lorem.sentences.join(' ') }
  given!(:talk_interview) { create(:talk_interview, feedback: feedback, notes: notes) }
  given(:interview_changes) do
    {
      interviewer_name: FFaker::Name.name,
      interview_type: 'Technical'
    }
  end

  scenario 'Changing update interviewer name and interview type' do
    visit "/interview/#{talk_interview.id}/edit"

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Interview'
      expect(page).to have_content 'Edit'
    end

    fill_interview(interview_changes)

    find('[data-testid="saveButton"]').click

    has_notification_with?('successfully updated')

    expect(page).to have_content interview_changes[:interviewer_name]
    expect(page).to have_content interview_changes[:interview_type]
  end

  scenario 'Associating to an application' do
    application = create(:application_sent)

    visit "/interview/#{talk_interview.id}/edit"

    within '[data-testid="pageHeader"]' do
      expect(page).to have_content 'Interview'
      expect(page).to have_content 'Edit'
    end

    fill_interview(application_position: application.position)

    find('[data-testid="saveButton"]').click

    expect(page).to have_content 'Interview'
    has_notification_with?('successfully updated')

    application_description = find('.ant-descriptions-item-label', text: 'Application').sibling('.ant-descriptions-item-content')
    expect(application_description).to have_content application.position
    expect(application_description).to have_content application.company
  end
end

feature 'Delete interview', js: true do
  given!(:talk_interview) { create(:talk_interview) }
  given!(:technical_with_application) { create(:with_application_sent, type_of: :technical) }

  scenario 'From interview view' do
    visit "/interview/#{technical_with_application.id}"

    expect(page).to have_content 'Interview'

    expect(page).to have_content technical_with_application.interviewer_name
    expect(page).to have_content technical_with_application.interviewer_email

    find('[data-testid="deleteButton"]').click

    confirm_delete
    has_notification_with?('successfully deleted')

    expect(page).to have_content 'Interview'

    within '[data-testid="interviewTable"]' do
      expect(page).to_not have_content technical_with_application.interviewer_name
    end
  end
end

def fill_interview(**keyword_args)
  fill_in 'interviewerName', with: keyword_args[:interviewer_name] if keyword_args.key? :interviewer_name
  fill_in 'interviewerEmail', with: keyword_args[:interviewer_email] if keyword_args.key? :interviewer_email

  if keyword_args.key? :interview_type
    find('[data-testid="interviewTypeOf"]').click
    find('.ant-select-item-option-content', text: keyword_args[:interview_type]).click
  end

  if keyword_args.key? :application_position
    find('[data-testid="interviewerApplication"]').click
    find('.ant-select-item-option-content', text: keyword_args[:application_position]).click
  end

  type_date '[data-testid="interviewAt"]', keyword_args[:interview_date] if keyword_args.key? :interview_date

  fill_in_ckeditor('[data-testid="interviewNotes"]', with: keyword_args[:interview_notes]) if keyword_args.key? :interview_notes
  fill_in_ckeditor('[data-testid="interviewFeedback"]', with: keyword_args[:interview_feedback]) if keyword_args.key? :interview_feedback
end