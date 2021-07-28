require 'capybara/rails'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'

Capybara.configure do |config|
  config.default_max_wait_time = 5
  config.test_id = 'data-testid'
  config.server = :puma, { Silent: true }
end

Capybara::Screenshot.register_driver(:selenium_chrome_headless) do |driver, path|
  driver.browser.manage.window.resize_to(1920, 1080)
  driver.browser.save_screenshot(path)
end

Capybara.register_driver :selenium_chrome_headless do |app|
  Capybara::Selenium::Driver.load_selenium

  browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
    opts.args << '--headless'
    opts.args << '--disable-gpu' if Gem.win_platform?
    opts.args << '--disable-site-isolation-trials'
    opts.args << '--no-sandbox'
    opts.args << '--window-size=1920,1080'
  end

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
end

Capybara.javascript_driver = :selenium_chrome_headless
Capybara.default_driver = :selenium_chrome_headless

RSpec.configure do |config|
  config.before do |example|
    if self.class.include?(Capybara::DSL)
      Capybara.current_driver = :selenium_chrome if example.metadata[:headed]
    end
  end
end