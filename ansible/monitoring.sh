#!/bin/bash
# Monitoring
ansible-playbook -i ./hosts.ini monitoring.yaml

echo `date` >> /home/ubuntu/ansible/roles/start-monitoring/monitoring-log.txt