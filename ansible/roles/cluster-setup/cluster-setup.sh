#!/usr/bin/env bash

# Variables
export declare -a nodes=($1 $2 $3)
export masternode="$1"
export declare -a othernodes=`echo ${nodes[@]} | sed s/${masternode}//`
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

curl -XGET "http://${user}:${pass}@${masternode}:5984/"

curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
    --header "Content-Type: application/json" --data "{\"action\": \"finish_cluster\"}"

for node in "${nodes[@]}"; do  curl -X GET "http://${user}:${pass}@${node}:5984/_membership"; done

curl -XPUT "http://${user}:${pass}@${masternode}:5984/twitter"

for node in "${nodes[@]}"; do  curl -X GET "http://${user}:${pass}@${node}:5984/_all_dbs"; done