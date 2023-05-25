# ccc-a2
### User Guide
In this section, we detail how our project was deployed to the Melbourne Research Cloud (MRC) in a manner that allows for scalablility.


#### Deploying Instances
As is detailed in section 5 of the report, were we unable to create a script to deploy the instances due to issues with OpenStack, and as a result these sections were done manually.

We created four instances using the snapshot detailed in section 1.1.2 each with a volume attached that stores the data. The size of these volumes vary depending on the role of the instance.

#### Configuring Instances
The snapshotted image used in the creation of our running instances ran the following steps:

With the instances that we created, we added unique public and private key pairings for each member of the group during the configuring stage. This was done such that each member can use their own private key to access the instances with the appropriate security implemented. In order to do this, we added an authorised keys file to the '/home/ubuntu/.ssh' directory 

Here, we also installed some specific dependencies to the instances in order to have the software run appropriately. We ran general linux updates with 'sudo apt update' and 'sudo apt-get upgrade'.

We then installed docker manually through the following steps:

1. installing dependencies such as curl, gnupg, ca-certificates and lsb-release

2. configuring a docker repository

3. Starting the Docker Daemon

4. Installing the following packages: docker-ce, docker-ce-cli, containerd.io, docker-compose-plugin

After this stage, a snapshot was taken under the name 'docker installed'

On our Ansible master instance, we also installed Ansible with 'python3 -m pip install --user Ansible'.
