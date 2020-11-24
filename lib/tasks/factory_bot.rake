namespace :factory_bot do
  desc 'Check if all factories are working'
  task lint: :environment do
    if Rails.env.test?
      printf 'Linting factories...'
      ActiveRecord::Base.transaction do
        FactoryBot.lint
        raise ActiveRecord::Rollback
      end
      printf " done\n"
    else
      puts "Please run using: bundle exec rake factory_bot:lint RAILS_ENV='test'"
    end
  end
end