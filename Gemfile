source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

ruby '2.6.6'

gem 'rails', '~> 5.2.4', '>= 5.2.4.5'
gem 'pg', '~> 0.21'
gem 'puma', '~> 3.12'
gem 'sass-rails', '~> 5.0'

gem 'jbuilder', '~> 2.5'
gem 'annotate'
gem 'acts-as-taggable-on', '~> 6.0'
gem 'rails-settings-cached', '0.6.5'
gem 'nokogiri', '~> 1.11'
gem 'kaminari', '1.2.1'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

group :development, :test do
  gem 'byebug', '~> 11.1', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails', '~> 2.7'
  gem 'rspec-rails', '~> 4.0.2'
  gem 'rubocop', '~> 0.93', require: false
  gem 'rubocop-rails', '~> 2.9'
  gem 'rubycritic', '~> 4.0', require: false
  gem 'bullet', '~> 6.1'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'simplecov', '~> 0.21', require: false
  gem 'database_cleaner', '~> 1.99'
  gem 'ffaker', '~> 2.17'
  gem 'shoulda-matchers', '~> 4.5', require: false
  gem 'factory_bot_rails', '= 5.0.2'
  gem 'rails-controller-testing', '1.0.1'
  gem 'capybara', '~> 3.33'
  gem 'webdrivers', '~> 4.4'
  gem 'capybara-screenshot', '~> 1.0', '>= 1.0.25'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]