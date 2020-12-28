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
    if should_compile_frontend?
      if ENV['NPM_BIN']
        compile_frontend
      else
        puts "Npm bin not set. Skipping frontend compilation."
      end
    end
  end
end

def should_compile_frontend?
  public_folder = Rails.root.join('public').to_s
  (!Dir.exist?(public_folder) || Dir.empty?(public_folder) || ENV['COMPILE_FRONTEND'])
end

def compile_frontend
  Rake.application.rake_require 'tasks/compile_frontend'
  Rake::Task.define_task(:environment)
  Rake::Task['frontend:compile'].invoke
end