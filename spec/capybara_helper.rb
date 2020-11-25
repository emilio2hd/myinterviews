# require 'rails_helper'
# require 'capybara/rails'
# require 'capybara/rspec'
# require 'capybara-screenshot/rspec'
#
# chrome_options = Selenium::WebDriver::Chrome::Options.new
# chrome_options.add_argument('--no-sandbox')
# chrome_options.add_argument('--disable-gpu')
#
# desired_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(loggingPrefs: { browser: 'ALL' })
#
# Capybara.register_driver :chrome do |app|
#   Capybara::Selenium::Driver.new(
#       app, browser: :chrome, options: chrome_options, desired_capabilities: desired_capabilities
#   )
# end
#
# Capybara.register_driver :headless_chrome do |app|
#   options = chrome_options
#   options.add_argument('--headless')
#   Capybara::Selenium::Driver.new(
#       app, browser: :chrome, options: options, desired_capabilities: desired_capabilities
#   )
# end
#
# Capybara.default_max_wait_time = 10 # seconds
# Capybara.default_driver = :headless_chrome
# Capybara.javascript_driver = :headless_chrome
# Capybara.always_include_port = true
# Capybara.test_id = 'data-testid'
#
# RSpec.configure do |config|
#   config.include Capybara::DSL
#
#   config.before(:each) do
#     Capybara.page.driver.browser.manage.window.maximize
#   end
#
#   config.after do |example|
#     save_screenshot if example.metadata[:type] == :feature
#   end
# end

# require 'selenium/webdriver'
# require 'capybara-screenshot/rspec'
# Capybara.javascript_driver = :selenium_chrome
#
# Capybara::Screenshot.register_driver(:selenium_chrome_headless) do |driver, path|
#   driver.browser.save_screenshot(path)
# end
#
# RSpec.configure do |config|
#   config.before(:each, type: :system) do
#     driven_by(:rack_test)
#   end
#
#   config.before(:each, type: :system, js: true) do
#     driven_by(:selenium_chrome_headless)
#   end
# end