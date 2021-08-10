# frozen_string_literal: true

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods

  config.before(:suite) do
    DatabaseCleaner.start
    # Test factories in spec/factories are working.
  rescue StandardError => e
    Rails.logger.error e
    raise e
  ensure
    DatabaseCleaner.clean
  end
end
