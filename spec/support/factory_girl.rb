RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods

  config.before(:suite) do
    begin
      DatabaseCleaner.start
      # Test factories in spec/factories are working.
      FactoryGirl.lint
    rescue
      Rails.logger.error $ERROR_INFO
      raise $ERROR_INFO
    ensure
      DatabaseCleaner.clean
    end
  end
end