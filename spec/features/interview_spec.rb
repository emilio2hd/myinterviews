require 'rails_helper'
require_relative 'feature_helper'

feature 'Creating new interview' do
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
    visit interviews_path
    expect(content_header).to have_content('Interviews')

    click_on('interviewNewButton')

    expect(content_header)
        .to have_content('Interviews')
        .and have_content('New')
  end

  scenario 'With no application' do
    fill_interview(interview)

    click_on('interviewSaveButton')

    has_message_alert_with? 'successfully created'

    within '[data-testid="interviewDetails"]' do
      expect(page).to have_content interview[:interviewer_name]
    end
  end

  scenario 'With application' do
    fill_interview(interview.merge(application_position: application.position))

    click_on('interviewSaveButton')

    has_message_alert_with? 'successfully created'

    within '[data-testid="interviewDetails"]' do
      expect(page).to have_content interview[:interviewer_name]
      expect(page).to have_content application.position
      expect(page).to have_content application.company
    end
  end
end

feature 'View interview' do
  let(:feedback) { FFaker::Lorem.sentences.join(' ') }
  let(:notes) { FFaker::Lorem.sentences.join(' ') }

  scenario 'Without application' do
    interview = create(:talk_interview, feedback: feedback, notes: notes)

    visit interview_path(interview)
    expect(content_header).to have_content('Interviews')

    within '[data-testid="interviewDetails"]' do
      expect(page).to have_content interview.interviewer_name
      expect(page).to have_content interview.interviewer_email

      expect(page).to have_css(".active[data-testid='interviewNotesTab']")
      expect(page).to have_content notes

      find('[data-testid="interviewNotesFeedback"]').click
      expect(page).to have_content feedback
    end
  end

  scenario 'With application' do
    interview = create(:with_application_sent, feedback: feedback, notes: notes)

    visit interview_path(interview)
    expect(content_header).to have_content('Interviews')

    within '[data-testid="interviewDetails"]' do
      expect(page).to have_content interview.interviewer_name
      expect(page).to have_content interview.interviewer_email

      expect(page).to have_content interview.my_application.position
      expect(page).to have_content interview.my_application.company
    end
  end
end

feature 'Editing existing interview' do
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
    visit edit_interview_path(talk_interview)

    expect(content_header)
        .to have_content('Interviews')
        .and have_content('Editing')


    fill_interview(interview_changes)

    click_on 'interviewSaveButton'

    has_message_alert_with? 'successfully updated'

    within '[data-testid="interviewDetails"]' do
      expect(page).to have_content interview_changes[:interviewer_name]
      expect(page).to have_content interview_changes[:interview_type]
    end
  end

  scenario 'Associating to an application' do
    application = create(:application_sent)

    visit edit_interview_path(talk_interview)

    expect(content_header)
        .to have_content('Interviews')
        .and have_content('Editing')

    fill_interview(application_position: application.position)

    click_on 'interviewSaveButton'

    has_message_alert_with? 'successfully updated'

    within '[data-testid="interviewDetails"]' do
      expect(page).to have_content application.position
      expect(page).to have_content application.company
    end
  end
end

feature 'Delete interview' do
  given!(:talk_interview) { create(:talk_interview) }
  given!(:technical_with_application) { create(:with_application_sent, type_of: :technical) }

  scenario 'From interview details page' do
    visit interview_path(technical_with_application)

    expect(content_header)
        .to have_content('Interviews')
        .and have_content(technical_with_application.application)

    within '[data-testid="interviewDetails"]' do
      expect(page).to have_content technical_with_application.interviewer_name
      expect(page).to have_content technical_with_application.interviewer_email
    end

    accept_alert do
      click_on 'interviewDeleteButton'
    end

    has_message_alert_with?('successfully destroyed')

    expect(page).to have_content 'Interview'

    within '[data-testid="interviewTable"]' do
      expect(page).to_not have_content technical_with_application.interviewer_name
    end
  end

  scenario 'From listing' do
    visit interviews_path
    expect(content_header).to have_content('Interviews')

    within '[data-testid="interviewTable"]' do
      expect(page).to have_content talk_interview.interviewer_name

      accept_alert do
        find('td', text: talk_interview.interviewer_name).ancestor('tr').find('[data-testid="interviewDeleteButton"]').click
      end
    end

    has_message_alert_with?('successfully destroyed')

    within '[data-testid="interviewTable"]' do
      expect(page).to_not have_content talk_interview.interviewer_name
    end
  end
end

def fill_interview(**keyword_args)
  select(keyword_args[:application_position], from: 'interviewApplication') if keyword_args.key? :application_position

  fill_in 'interviewInterviewerName', with: keyword_args[:interviewer_name] if keyword_args.key? :interviewer_name
  fill_in 'interviewInterviewerEmail', with: keyword_args[:interviewer_email] if keyword_args.key? :interviewer_email

  select(keyword_args[:interview_type], from: 'interviewTypeOf') if keyword_args.key? :interview_type

  fill_in 'interviewDate', with: keyword_args[:interview_date] if keyword_args.key? :interview_date

  page.execute_script("tinymce.get('interview_notes').setContent('#{keyword_args[:interview_notes]}')") if keyword_args.key? :interview_notes
  page.execute_script("tinymce.get('interview_feedback').setContent('#{keyword_args[:interview_feedback]}')") if keyword_args.key? :interview_feedback
end