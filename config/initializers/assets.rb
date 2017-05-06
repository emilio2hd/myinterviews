# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'adminlte-2.3.6')
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'adminlte-2.3.6', 'bootstrap', 'fonts')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w(application-footer.js)
Rails.application.config.assets.precompile += %w(*.svg *.eot *.woff *.woff2 *.ttf)

Rails.application.config.tinymce.install = :copy