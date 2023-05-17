#!/bin/bash

# . ./openstack.sh; ansible-playbook -i hosts --ask-become-pass main_instance.yaml
. ./openstack.sh; ansible-playbook -i ./hosts.ini --ask-become-pass couchdb-setup.yaml
# . ./openstack.sh; ansible-playbook -i hosts --ask-become-pass deploy_Harvester.yaml
# . ./openstack.sh; ansible-playbook -i hosts --ask-become-pass build_website.yaml