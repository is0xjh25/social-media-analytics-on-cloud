docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
sudo rm /volume/couchdb/_dbs.couch; sudo rm /volume/couchdb/_nodes.couch; sudo rm -r /volume/couchdb/shards; sudo rm -r /volume/couchdb/.delete