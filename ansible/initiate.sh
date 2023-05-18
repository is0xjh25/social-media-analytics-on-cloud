#!/bin/bash

# Initial setup
. ./openstack.sh; ansible-playbook -i ./hosts.ini --ask-become-pass initial-setup.yaml
# . ./openstack.sh; ansible-playbook -i hosts --ask-become-pass deploy-twitter-processor.yaml
# . ./openstack.sh; ansible-playbook -i hosts --ask-become-pass deploy-mastodon-harvester.yaml
# . ./openstack.sh; ansible-playbook -i hosts --ask-become-pass build-website.yaml