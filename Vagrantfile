# -*- mode: ruby -*-
# vi: set ft=ruby :
if %w[up reload].include?(ARGV[0])
  plugins_dependencies = %w(
    vagrant-vbguest
    vagrant-docker-compose
    vagrant-disksize
    vagrant-rsync-back
  ) # <- ここに必要なプラグインを列挙する
  plugin_status = false
  plugins_dependencies.each do |plugin_name|
    unless Vagrant.has_plugin? plugin_name
      puts "#{plugin_name} is required."
      system("vagrant plugin install #{plugin_name}")
      plugin_status = true
    end
  end
  # Restart Vagrant if any new plugin installed
  if plugin_status === true
    exec "vagrant #{ARGV.join' '}"
  else
    puts "All Plugin Dependencies already installed."
  end
end

GUEST_IP_ADDR = "192.168.1.100"
PATH_MAPPINGS = {
  docker:   { host: "./docker" ,  guest: "/vagrant/docker" },
  backend:  { host: "./backend",  guest: "/vagrant/backend" },
  #frontend: { host: "./frontend", guest: "/vagrant/frontend" },
}

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "generic/ubuntu2004"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network "private_network", ip: GUEST_IP_ADDR

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"
  config.vm.synced_folder PATH_MAPPINGS[:docker][:host], PATH_MAPPINGS[:docker][:guest],
    owner: "vagrant", group: "vagrant",
    type: "rsync", create: true,
    rsync_auto: true
  config.vm.synced_folder PATH_MAPPINGS[:backend][:host], PATH_MAPPINGS[:backend][:guest],
    owner: "vagrant", group: "vagrant",
    type: "rsync", create: true,
    rsync_auto: true, rsync__exclude: ['.git/', 'log/', 'tmp/'],
    mount_options: ['dmode=777','fmode=777']
  #config.vm.synced_folder PATH_MAPPINGS[:frontend][:host], PATH_MAPPINGS[:frontend][:guest],
  #  owner: "vagrant", group: "vagrant",
  #  type: "rsync", create: true,
  #  rsync_auto: true, rsync__exclude: ['.git/', 'node_modules/', 'log/', 'tmp/'],
  #  mount_options: ['dmode=777','fmode=777']

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.
  config.vm.provider :virtualbox do |vb|
    vb.gui = false
    vb.cpus = 4
    vb.memory = 4096
    vb.customize ["modifyvm", :id, "--audio", "none"]
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'off']
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'off']
    vb.customize ['modifyvm', :id, '--cableconnected1', 'on']
  end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  #config.vm.provision "shell", inline: <<-SHELL
  #  apt-get update
  #  apt install nodejs-dev node-gyp libssl1.0-dev
  #  apt install -y nodejs npm
  #  npm install n -g
  #  n stable
  #  apt purge -y nodejs npm
  #  exec $SHELL -l
  #  npm install --global yarn
  #SHELL
  config.vm.provision :docker
  config.vm.provision :docker_compose,
   yml: "#{PATH_MAPPINGS[:docker][:guest]}/docker-compose.yml",
   rebuild: true,
   run: "always"
end
