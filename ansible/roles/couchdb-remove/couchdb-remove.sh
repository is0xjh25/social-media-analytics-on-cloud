#!/usr/bin/env bash
docker stop couchdb$1 && docker rm couchdb$1
sudo rm /volume/couchdb/_dbs.couch; sudo rm /volume/couchdb/_nodes.couch; sudo rm -r /volume/couchdb/.shards; sudo rm -r /volume/couchdb/.delete