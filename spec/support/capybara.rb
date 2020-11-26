require 'capybara/rails'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'

Capybara.server = :puma, { Silent: true }
Capybara.javascript_driver = :selenium_chrome_headless

Capybara::Screenshot.register_driver(:selenium_chrome_headless) do |driver, path|
  driver.browser.save_screenshot(path)
end

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by :selenium_chrome_headless
  end

  config.before do |example|
    if self.class.include?(Capybara::DSL)
      if example.metadata[:headed_js]
        Capybara.current_driver = :selenium_chrome
        Capybara.page.driver.browser.manage.window.maximize
      end
    end
  end
end