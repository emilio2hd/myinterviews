# frozen_string_literal: true

def content_header
  find('[data-testid="contentHeader"]')
end

def has_message_alert_with?(message)
  expect(page).to have_selector('[data-testid="alertMessage"]')

  within '[data-testid="alertMessage"]' do
    expect(page).to have_content message
  end
end
