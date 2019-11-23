source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.7.2'
gem 'pg', '~> 0.21'
gem 'puma', '~> 3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'tinymce-rails'

gem 'jquery-rails'
gem 'jbuilder', '~> 2.5'
gem 'annotate'
gem 'acts-as-taggable-on', '4.0.0'
gem 'rails-settings-cached', '0.6.5'
gem 'nokogiri', '~> 1.10'
gem 'kaminari', '1.0.1'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'dotenv-rails'
  gem 'rspec-rails'
  gem 'rubocop', '~> 0.68', require: false
  gem 'rubocop-rails' '~> 2.3'
  gem 'rubycritic', '~> 4.0', require: false
  gem 'bullet'
end

group :development do
  gem 'web-console'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
end

group :test do
  gem 'simplecov', '~> 0.17', require: false
  gem 'database_cleaner'
  gem 'ffaker'
  gem 'shoulda-matchers', '~> 4.0'
  gem 'factory_bot_rails', '~> 4.10.0'
  gem 'rails-controller-testing', '1.0.1'
  gem 'rspec-its'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem 'execjs'
