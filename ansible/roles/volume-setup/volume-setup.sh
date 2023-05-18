# Reformat volume
sudo mkfs.ext4 /dev/vdd

# Mount
sudo mount /dev/vdd /volume
sudo chmod 777 /volume
sudo mkdir /volume/couchdb/
sudo chmod 777 /volume/couchdb