#!/usr/bin/env bash

# Variables
export declare nodes=($1 $2 $3)
export masternode=`echo ${nodes} | cut -f1 -d' '`
export declare othernodes=`echo ${nodes[@]} | sed s/${masternode}//`
export size=${#nodes[@]}
export user='jim'
export pass='jimistired'
export cookie='timtam'

# Set up cluster
for node in ${othernodes} 
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup" \
      --header "Content-Type: application/json"\
      --data "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\",\
             \"username\": \"${user}\", \"password\":\"${pass}\", \"port\": \"5984\",\
             \"remote_node\": \"${node}\", \"node_count\": \"$(echo ${nodes[@]} | wc -w)\",\
             \"remote_current_user\":\"${user}\", \"remote_current_password\":\"${pass}\"}"
done

for node in ${othernodes}
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
      --header "Content-Type: application/json"\
      --data "{\"action\": \"add_node\", \"host\":\"${node}\",\
             \"port\": \"5984\", \"username\": \"${user}\", \"password\":\"${pass}\"}"
done

# export user=jim
# export pass=jimistired
# export masternode=$1
# # export masternode=$1

# curl -X POST -H "Content-Type: application/json" "http://${user}:${pass}@${masternode}:5984/_cluster_setup" -d "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\", \"username\": \"${user}\", \"password\":\"${pass}\", \"port\": 5984, \"node_count\": \"3\", \"remote_node\": \"172.26.134.50\", \"remote_current_user\": \"jim\", \"remote_current_password\": \"jimistired\"}"
# curl -X POST -H "Content-Type: application/json" http://${user}:${pass}@${masternode}:5984/_cluster_setup -d '{"action": "add_node", "host":"172.26.134.50", "port": 5984, "username": "jim", "password":"jimistired"}'

# curl -X POST -H "Content-Type: application/json" http://${user}:${pass}@${masternode}:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "jim", "password":"jimistired", "port": 5984, "node_count": "3", "remote_node": "172.26.128.215", "remote_current_user": "jim", "remote_current_password": "jimistired"}'
# curl -X POST -H "Content-Type: application/json" http://${user}:${pass}@${masternode}:5984/_cluster_setup -d '{"action": "add_node", "host":"172.26.128.215", "port": 5984, "username": "jim", "password":"jimistired"}'