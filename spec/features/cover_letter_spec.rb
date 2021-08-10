# frozen_string_literal: true

require 'rails_helper'
require_relative 'feature_helper'

feature 'Creating new cover letter' do
  before do
    visit cover_letters_path
    expect(content_header).to have_content('Cover Letter')
  end

  scenario 'With correct data' do
    title = "#{FFaker::Company.position} cover letter"
    content = FFaker::Lorem.sentences.join(' ')

    click_on('coverLetterNewButton')

    expect(content_header)
      .to have_content('Cover Letters')
      .and have_content('New')

    fill_cover_letter(title, content)
    click_on 'coverLetterSaveButton'

    has_message_alert_with? 'successfully created'

    expect(content_header).to have_content(title)

    within '[data-testid="coverLetterDetails"]' do
      expect(page).to have_content title
      expect(page).to have_content content
    end
  end
end

feature 'Editing existing cover letter' do
  given!(:cover_letter) { create(:cover_letter) }

  before do
    visit cover_letter_path(cover_letter)
    expect(content_header).to have_content('Cover Letter')
  end

  scenario 'From listing' do
    visit cover_letters_path
    expect(content_header).to have_content('Cover Letter')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title

      find('a', text: cover_letter.title).ancestor('tr').find('[data-testid="coverLetterEditButton"]').click
    end

    expect(page).to have_current_path(edit_cover_letter_path(cover_letter))
  end

  scenario 'From cover letter details' do
    expect(content_header).to have_content(cover_letter.title)

    click_on('coverLetterEditButton')

    new_title = "[Edited] #{FFaker::Company.position}"
    new_content = FFaker::Lorem.sentences.join(' ')

    expect(page).to have_current_path(edit_cover_letter_path(cover_letter))

    fill_cover_letter(new_title, new_content)
    click_on 'coverLetterSaveButton'

    has_message_alert_with? 'successfully updated'

    within '[data-testid="coverLetterDetails"]' do
      expect(page).to have_content new_title
      expect(page).to have_content new_content
    end
  end
end

feature 'Duplicate cover letter' do
  given!(:cover_letter) { create(:cover_letter) }

  scenario 'From listing' do
    visit cover_letters_path
    expect(content_header).to have_content('Cover Letter')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title

      find('a', text: cover_letter.title).ancestor('tr').find('[data-testid="coverLetterDuplicateButton"]').click
    end

    expect(page).to have_current_path(duplicate_cover_letter_path(cover_letter))
  end

  scenario 'From cover letter details page' do
    visit cover_letter_path(cover_letter)
    expect(content_header).to have_content(cover_letter.title)

    click_on('coverLetterDuplicateButton')

    expect(page).to have_current_path(duplicate_cover_letter_path(cover_letter))
    expect(page).to have_field('coverLetterTitle', with: "#{cover_letter.title} [Copy]")

    new_title = "Copy of #{cover_letter.title}"
    new_content = FFaker::Lorem.sentences.join(' ')

    fill_cover_letter(new_title, new_content)
    click_on 'coverLetterSaveButton'

    has_message_alert_with?('successfully created')

    within '[data-testid="coverLetterDetails"]' do
      expect(page).to have_content new_title
      expect(page).to have_content new_content
    end
  end
end

feature 'Delete cover letter' do
  given!(:ruby_cover_letter) { create(:cover_letter, title: 'Ruby cover letter') }
  given!(:angular_cover_letter) { create(:cover_letter, title: 'Angular cover letter') }

  scenario 'From listing' do
    visit cover_letters_path
    expect(content_header).to have_content('Cover Letter')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content ruby_cover_letter.title

      accept_alert do
        find('a', text: ruby_cover_letter.title).ancestor('tr').find('[data-testid="coverLetterDeleteButton"]').click
      end
    end

    has_message_alert_with?('successfully destroyed')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to_not have_content ruby_cover_letter.title
    end
  end

  scenario 'From cover letter details page' do
    visit cover_letter_path(angular_cover_letter)
    expect(content_header).to have_content(angular_cover_letter.title)

    accept_alert do
      click_on 'coverLetterDeleteButton'
    end

    has_message_alert_with?('successfully destroyed')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to_not have_content angular_cover_letter.title
    end
  end
end

feature 'Send cover letter by email' do
  given!(:cover_letter) { create(:cover_letter) }
  given!(:setting) { create(:local_email_setting) }

  scenario 'From listing' do
    visit cover_letters_path
    expect(content_header).to have_content('Cover Letter')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title

      find('a', text: cover_letter.title).ancestor('tr').find('[data-testid="coverLetterSendEmailButton"]').click
    end

    expect(page).to have_current_path(new_email_cover_letter_path(cover_letter))
  end

  scenario 'From cover letter details' do
    visit cover_letter_path(cover_letter)
    expect(content_header).to have_content(cover_letter.title)

    click_on('coverLetterSendEmailButton')

    expect(page).to have_current_path(new_email_cover_letter_path(cover_letter))
    expect(page).to have_content 'Send Cover Letter'
    expect(page).to have_field('coverLetterMessage', with: cover_letter.content, visible: false)

    fill_in('coverLetterEmailTo', with: FFaker::Internet.email)
    fill_in('coverLetterEmailSubject', with: cover_letter.title)

    expect do
      click_on 'coverLetterSendButton'

      has_message_alert_with?('successfully sent')
    end.to change { ActionMailer::Base.deliveries.size }.by(1)
  end
end

def fill_cover_letter(title, content)
  fill_in 'coverLetterTitle', with: ''
  fill_in 'coverLetterTitle', with: title

  page.execute_script("tinyMCE.activeEditor.setContent('#{content}')") if content
end
