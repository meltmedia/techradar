# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_plugin 'vocker'

Vagrant.configure("2") do |config|

  config.vm.hostname = "vm#{rand(10..99)}-#{ENV['USER']}"

  config.vm.box = "raring64-melt"
  config.vm.box_url = "https://s3-us-west-1.amazonaws.com/meltmedia-public-boxes/vagrant/vagrant-vbox-raring-docker.box"
  config.vm.synced_folder "~/", "/#{ENV['USER']}", id: 'host-home-root'#, nfs: true

  # Set reasonable defaults for CPU / Memory allocation
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", 512]
    vb.customize ["modifyvm", :id, "--cpus", 2]
  end

  # Setup Docker
  config.vm.provision :docker

  # Build and Run Demo
  config.vm.provision :shell, :path => "docker/start.sh"

end

# Open up the Docker ports
Vagrant::VERSION >= "1.1.0" and Vagrant.configure("2") do |config|
  (49000..49900).each do |port|
    config.vm.network :forwarded_port, :host => port, :guest => port
  end
end