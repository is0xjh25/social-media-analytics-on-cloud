# Reformat volume
sudo mkfs.ext4 /dev/vdb

# Mount
sudo mount /dev/vdb /volume
sudo chmod 777 /volume
sudo mkdir /volume/couchdb/
sudo chmod 777 /volume/couchdb
sudo mkdir /volume/data/
sudo chmod 777 /volume/data