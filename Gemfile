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

gem 'acts-as-taggable-on', '4.0.0'
gem 'rails-settings-cached', '0.6.5'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'dotenv-rails', '2.2.0'
  gem 'rspec-rails', '3.5.2'
  gem 'rubocop', '0.46.0', require: false
  gem 'rubycritic', '3.2.0', require: false
  gem 'bullet', '5.4.2'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'simplecov', '0.12.0', require: false
  gem 'database_cleaner', '1.5.3'
  gem 'ffaker', '2.2.0'
  gem 'shoulda-matchers', '3.1.1'
  gem 'factory_girl_rails', '4.7.0'
  gem 'rails-controller-testing', '1.0.1'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'execjs'
#gem 'therubyracer', platforms: :ruby
