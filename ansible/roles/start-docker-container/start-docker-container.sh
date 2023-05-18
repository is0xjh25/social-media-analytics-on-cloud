# Start container of couchdb
sudo docker start couchdb$1
# Set up cluster
# curl -X POST -H "Content-Type: application/json" http://jim:jimistired@172.26.130.194:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "jim", "password":"jimistired", "port": 5984, "node_count": "3", "remote_node": "172.26.135.95", "remote_current_user": "jim", "remote_current_password": "jimistired"}'
# curl -X POST -H "Content-Type: application/json" http://jim:jimistired@172.26.130.194:5984/_cluster_setup -d '{"action": "add_node", "host":"172.26.128.215", "port": 5984, "username": "jim", "password":"jimistired"}'