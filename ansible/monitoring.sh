#!/bin/bash
# Monitoring
ansible-playbook -i /home/ubuntu/ansible/hosts.ini /home/ubuntu/ansible/monitoring.yaml
# Log file
echo $(date) >> /home/ubuntu/ansible/roles/start-monitoring/monitoring-log.txt
echo $(date) >> /home/ubuntu/ansible/roles/start-monitoring/monitoring-result.txt