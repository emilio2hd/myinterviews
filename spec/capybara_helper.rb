require 'rails_helper'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'

chrome_options = Selenium::WebDriver::Chrome::Options.new
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-gpu')

desired_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(loggingPrefs: { browser: 'ALL' })

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(
      app, browser: :chrome, options: chrome_options, desired_capabilities: desired_capabilities
  )
end

Capybara.register_driver :headless_chrome do |app|
  options = chrome_options
  options.add_argument('--headless')
  Capybara::Selenium::Driver.new(
      app, browser: :chrome, options: options, desired_capabilities: desired_capabilities
  )
end

Capybara.default_max_wait_time = 10 # seconds
Capybara.save_path = Rails.root.join('tmp', 'capybara')
Capybara.default_driver = :chrome
Capybara.javascript_driver = :chrome

RSpec.configure do |config|
  config.before(:each) do
    Capybara.page.driver.browser.manage.window.maximize
  end

  config.after do |example|
    if example.metadata[:type] == :feature
      # save_and_open_page
      save_and_open_screenshot
    end
  end
end