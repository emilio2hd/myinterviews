# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/trusty64'

  # Check for updates running `vagrant box outdated`.
  config.vm.box_check_update = false

  config.vm.network 'private_network', ip: '192.168.33.101'

  config.vm.synced_folder '.', '/opt/myinterviews'

  config.vm.provider :virtualbox do |vb|
    vb.memory = '1024'
  end

  env_vars = { APP_DIR: '/opt/myinterviews' }

  # Only run the provisioning on the first 'vagrant up'
  Dir['shell/install/*.sh'].sort.each do |script|
   config.vm.provision :shell, path: script, env: env_vars, privileged: false
  end

  unless Dir.glob("#{File.dirname(__FILE__)}/.vagrant/machines/default/*/id").empty?
    config.vm.provision 'update_app', type: 'shell' do |update_app|
      update_app.path = 'shell/update-application.sh'
      update_app.env = env_vars
    end
  end
end
