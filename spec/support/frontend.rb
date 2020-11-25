require 'rake'

# Capybara tests requires frontend to be compiled before running it.
# In order to compile the frontend, it's required to set a npm bin path(NPM_BIN).
#
# Once the public folder has all frontend compiled files, use COMPILE_FRONTEND to force recompilation
# or clear the public folder.
#
# Run COMPILE_FRONTEND=true NPM_BIN=npm bundle exec rspec
RSpec.configure do |config|
  config.before(:suite) do
    public_folder = Rails.root.join('public').to_s

    if ENV['NPM_BIN'] && (Dir.empty?(public_folder) || ENV['COMPILE_FRONTEND'])
      Rake.application.rake_require 'tasks/compile_frontend'
      Rake::Task.define_task(:environment)
      Rake::Task['frontend:compile'].invoke
    elsif !ENV['NPM_BIN']
      puts "Npm bin not set. Skipping frontend compilation."
    end
  end
end