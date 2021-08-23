# frozen_string_literal: true

# Original source: https://gist.github.com/hopsoft/56ba6f55fe48ad7f8b90
#
# Usage:
#
# # dump the development db
# rake db:dump
#
# # list dumps
# rake db:dumps
#
# # dump the production db
# RAILS_ENV=production rake db:dump
#
# # restore db based on a latest backup file pattern (e.g. timestamp)
# rake db:restore pattern=20210821
#
# # note: config/database.yml is used for database configuration.
namespace :db do
  desc 'Dumps the database'
  task dump: :environment do
    cmd = nil
    full_path = nil

    with_config do |host, db, user|
      full_path = "#{backup_directory}/#{Time.zone.now.strftime('%Y%m%d%H%M%S')}_#{db}.dump"
      cmd = "pg_dump -F c -v -O -U '#{user}' -h '#{host}' -d '#{db}' -f '#{full_path}'"
    end

    puts cmd
    system "#{pg_password} #{cmd}"

    puts ''
    puts "Dumped to file: #{full_path}"
    puts ''
  end

  desc 'Show the existing database backups'
  task dumps: :environment do
    puts backup_directory
    system "/bin/ls -ltR #{backup_directory}"
  end

  desc 'Restores the database dump'
  task restore: :environment do
    pattern = ENV['pattern']
    files = Dir.glob("#{backup_directory}/**/*#{pattern}*")
    cmd = nil

    if files.size.zero?
      puts 'Not file found to restore'
      return
    end

    file = files.sort!.reverse!.first # get the latest file
    with_config do |host, db, user|
      cmd = "pg_restore --clean --if-exists -F c -v -U '#{user}' -h '#{host}' -d '#{db}' '#{file}'"
    end

    unless cmd.nil?
      Rake::Task['db:drop'].invoke
      Rake::Task['db:create'].invoke

      puts cmd
      system "#{pg_password} #{cmd}"

      puts ''
      puts "Restored from file: #{file}"
      puts ''
    end
  end

  private

  def backup_directory
    ENV['BACKUP_FOLDER'] || Rails.root.join('db')
  end

  def pg_password
    "PGPASSWORD=#{Shellwords.escape(ActiveRecord::Base.connection_config[:password])} "
  end

  def with_config
    yield ActiveRecord::Base.connection_config[:host],
        ActiveRecord::Base.connection_config[:database],
        ActiveRecord::Base.connection_config[:username]
  end
end
