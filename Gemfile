# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

ruby '2.6.6'

gem 'rails', '~> 5.2'
gem 'pg', '~> 0.21'
gem 'puma', '~> 4.3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'tinymce-rails'

gem 'jquery-rails'
gem 'jbuilder', '~> 2.5'
gem 'annotate'
gem 'acts-as-taggable-on'
gem 'rails-settings-cached', '0.6.5'
gem 'nokogiri', '~> 1.13'
gem 'kaminari', '1.2.1'

gem 'ffi', '>= 1.9.24'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails'
  gem 'rspec-rails'
  gem 'rspec_junit_formatter'
  gem 'rubocop', '1.5.2', require: false
  gem 'rubocop-rails', '~> 2.3'
  gem 'rubycritic', '~> 4.0', require: false
  gem 'bullet'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'simplecov', '~> 0.17', require: false
  gem 'simplecov-lcov', require: false
  gem 'database_cleaner'
  gem 'ffaker'
  gem 'shoulda-matchers', '~> 4.0', require: false
  gem 'factory_bot_rails', '~> 4.10.0'
  gem 'rails-controller-testing', '1.0.1'
  gem 'rspec-its'

  gem 'capybara'
  gem 'webdrivers'
  gem 'capybara-screenshot'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem 'execjs'
