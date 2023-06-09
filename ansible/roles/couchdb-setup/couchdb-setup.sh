#!/usr/bin/env bash

# Variables
export node="$1"
export size=1
export user='jim'
export pass='jimistired'
export VERSION='3.2.1'
export cookie='timtam'

# Pull couchdb image
sudo docker pull ibmcom/couchdb3:${VERSION}

echo "Create Docker containers......"
if [ ! -z $(docker ps --all --filter "name=couchdb${node}" --quiet) ] 
    then
        docker stop $(docker ps --all --filter "name=couchdb${node}" --quiet) 
        docker rm $(docker ps --all --filter "name=couchdb${node}" --quiet)
fi

# Create Docker
docker create\
    -p 5984:5984\
    -p 4369:4369\
    -p 9100-9200:9100-9200\
    -p 5986:5986\
	-v /volume/couchdb:/opt/couchdb/data\
    --name couchdb${node}\
    --env COUCHDB_USER=${user}\
    --env COUCHDB_PASSWORD=${pass}\
    --env COUCHDB_SECRET=${cookie}\
    --env ERL_FLAGS="-setcookie \"${cookie}\" -name \"couchdb@${node}\""\
    ibmcom/couchdb3:${VERSION}

# Start container of couchdb
sudo docker start couchdb${node}
