require 'rails_helper'

feature 'Creating new cover letter', js: true do
  before do
    visit '/cover-letter'
    expect(page).to have_content 'Cover Letter'
  end

  scenario 'With correct data' do
    title = "#{FFaker::Company.position} cover letter"
    content = FFaker::Lorem.sentences.join(' ')

    click_on('coverLetterNewButton')

    within '[data-testid="coverLetterDrawerTitle"]' do
      expect(page).to have_content 'New cover letter'
    end

    fill_cover_letter(title, content)

    has_notification_with?('successfully saved')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content title
    end
  end
end

feature 'Editing existing cover letter', js: true do
  given!(:cover_letter) { create(:cover_letter) }

  before do
    visit '/cover-letter'
    expect(page).to have_content 'Cover Letter'
  end

  scenario 'Changing title and content' do
    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title

      find('a', text: cover_letter.title).click
    end

    within '[data-testid="coverLetterDrawerTitle"]' do
      expect(page).to have_content cover_letter.title
    end

    new_title = "[Edited] #{FFaker::Company.position}"
    new_content = FFaker::Lorem.sentences.join(' ')

    fill_cover_letter(new_title, new_content)

    has_notification_with?('successfully saved')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content new_title
    end
  end

  scenario 'Save as copy' do
    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title
      find('a', text: cover_letter.title).click
    end

    within '[data-testid="coverLetterDrawerTitle"]' do
      expect(page).to have_content cover_letter.title
    end

    new_title = "[As Copy] #{cover_letter.title}"
    new_content = FFaker::Lorem.sentences.join(' ')

    fill_cover_letter(new_title, new_content, false)

    click_on('coverLetterDrawerMoreSaveOptionsButton')
    expect(page).to have_content 'Save as copy'
    find('[data-testid="coverLetterDrawerSaveAsCopyButton"]').click

    has_notification_with?('saved as copy')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title
      expect(page).to have_content new_title
    end
  end
end

feature 'Delete cover letter', js: true do
  given!(:ruby_cover_letter) { create(:cover_letter, title: 'Ruby cover letter') }
  given!(:angular_cover_letter) { create(:cover_letter, title: 'Angular cover letter') }

  before do
    visit '/cover-letter'
    expect(page).to have_content 'Cover Letter'
  end

  scenario 'From listing' do
    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content ruby_cover_letter.title

      find('a', text: ruby_cover_letter.title).ancestor('tr').find('a', text: 'Delete').click
    end

    confirm_delete
    has_notification_with?('successfully deleted')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to_not have_content ruby_cover_letter.title
    end
  end

  scenario 'From viewing cover letter' do
    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content angular_cover_letter.title

      find('a', text: angular_cover_letter.title).click
    end

    within '[data-testid="coverLetterDrawerTitle"]' do
      expect(page).to have_content  angular_cover_letter.title
    end

    within '.ant-drawer-title' do
      more_options_button = find('[data-testid="coverLetterDrawerMoreOptionsButton"]')
      more_options_button.hover
      more_options_button.click
    end

    find('[data-testid="coverLetterDrawerDeleteButton"]').click

    confirm_delete
    has_notification_with?('successfully deleted')

    within '[data-testid="coverLetterTable"]' do
      expect(page).to_not have_content angular_cover_letter.title
      expect(page).to have_content ruby_cover_letter.title
    end
  end
end

feature 'Send cover letter by email', js: true do
  given!(:cover_letter) { create(:cover_letter) }
  given!(:setting) { create(:local_email_setting) }

  before do
    visit '/cover-letter'
    expect(page).to have_content 'Cover Letter'
  end

  scenario 'From listing' do
    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title

      find('a', text: cover_letter.title).ancestor('tr').find('a', text: 'Send').click
    end

    within 'nz-modal-container' do
      expect(page).to have_content 'Send cover letter'
      expect(page).to_not have_selector '[data-testid="coverLetterEmailSenderWarning"]'
    end

    fill_in('coverLetterEmailTo', with: FFaker::Internet.email)
    expect(page).to have_field('coverLetterEmailSubject', with: cover_letter.title)

    expect do
      click_on 'coverLetterEmailSendButton'

      expect(page).to_not have_selector 'coverLetterEmailSendButton', text: 'Sending'

      has_notification_with?('successfully sent to')
    end.to change { ActionMailer::Base.deliveries.size }.by(1)
  end

  scenario 'From viewing cover letter' do
    within '[data-testid="coverLetterTable"]' do
      expect(page).to have_content cover_letter.title

      find('a', text: cover_letter.title).click
    end

    within '[data-testid="coverLetterDrawerTitle"]' do
      expect(page).to have_content cover_letter.title
    end

    within '.ant-drawer-title' do
      more_options_button = find('[data-testid="coverLetterDrawerMoreOptionsButton"]')
      more_options_button.hover
      more_options_button.click
    end

    find('[data-testid="coverLetterDrawerSendEmailButton"]').click

    within 'nz-modal-container' do
      expect(page).to have_content 'Send cover letter'
    end

    fill_in('coverLetterEmailTo', with: FFaker::Internet.email)
    expect(page).to have_field('coverLetterEmailSubject', with: cover_letter.title)

    expect do
      click_on 'coverLetterEmailSendButton'

      expect(page).to_not have_selector 'coverLetterEmailSendButton', text: 'Sending'

      has_notification_with?('successfully sent to')
    end.to change { ActionMailer::Base.deliveries.size }.by(1)
  end
end

def confirm_delete
  within '.ant-popover' do
    click_button 'OK'
  end
end

def has_notification_with?(message)
  expect(page).to have_selector('nz-notification')

  within 'nz-notification' do
    expect(page).to have_content message
  end
end

def fill_cover_letter(title, content, save = true)
  fill_in 'coverLetterTitle', with: ''
  fill_in 'coverLetterTitle', with: title
  fill_in_ckeditor('[data-testid="coverLetterContent"]', with: content) if content

  find('[data-testid="coverLetterDrawerSaveButton"]').click if save
end

def fill_in_ckeditor(locator = nil, with:)
  ckeditor = all("#{locator} .ck-editor__editable").first
  ckeditor.click
  ckeditor.execute_script 'document.execCommand( "selectAll", false, null )'
  ckeditor.send_keys :delete
  ckeditor.send_keys with
end