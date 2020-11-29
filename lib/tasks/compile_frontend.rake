namespace :frontend do
  desc 'Compile frontend angular app to public folder'
  task compile: :environment do
    npm_bin = ENV['NPM_BIN']

    # rubocop:disable Style/IfUnlessModifier
    if npm_bin.blank?
      raise 'Npm bin path must be set to proceed. Run bundle exec rake frontend:compile NPM_BIN=npm_bin_path'
    end

    # rubocop:enable Style/IfUnlessModifier

    frontend_folder = Rails.root.join('frontend').to_s
    public_folder = Rails.root.join('public').to_s

    args = [
      '--watch=false',
      '--progress=false',
      "--outputPath=#{public_folder}"
    ]

    puts 'Compiling frontend app...'
    system("#{npm_bin} --prefix #{frontend_folder} run build -- #{args.join(' ')}")
    puts '...done!'
  end
end