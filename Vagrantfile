# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/trusty64'

  # Check for updates running `vagrant box outdated`.
  config.vm.box_check_update = false

  config.vm.network 'private_network', ip: '192.168.33.101'

  config.vm.provider :virtualbox do |vb|
    vb.memory = '1024'
  end

  # Only run the provisioning on the first 'vagrant up'
  if Dir.glob("#{File.dirname(__FILE__)}/.vagrant/machines/default/*/id").empty?
    Dir['shell/*.sh'].sort.each do |script|
      config.vm.provision :shell, :path => script, :privileged => false
    end
  end
end
