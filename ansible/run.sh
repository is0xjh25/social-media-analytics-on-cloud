#!/bin/bash

. ./openstack.sh; ansible-playbook -vv main.yaml | tee output.txt