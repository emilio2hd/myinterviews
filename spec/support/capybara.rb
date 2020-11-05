def chrome_options
  opts = Selenium::WebDriver::Chrome::Options.new
  opts.add_argument('--no-sandbox')
  opts.add_argument('--disable-gpu')
  opts.add_argument('--window-size=1200,1200')
  opts
end

desired_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(loggingPrefs: { browser: 'ALL' })

Capybara.default_max_wait_time = 10 # seconds

Capybara.save_path = Rails.root.join('tmp', 'feature_screenshot')

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

Capybara.default_driver = :chrome
Capybara.javascript_driver = :chrome