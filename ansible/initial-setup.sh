#!/bin/bash
# Initial setup
. ./openstack.sh; ansible-playbook -i ./hosts.ini --ask-become-pass initial-setup.yaml