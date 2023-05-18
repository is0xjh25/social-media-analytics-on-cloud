# # Remove old version of Docker
# dpkg -l | grep -i docker
# sudo apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli docker-compose-plugin
# sudo apt-get autoremove -y --purge docker-engine docker docker.io docker-ce docker-compose-plugin
# sudo rm -rf /var/lib/docker /etc/docker
# sudo rm /etc/apparmor.d/docker
# sudo groupdel docker
# sudo rm -rf /var/run/docker.sock

    
# # Install Dependencies
# sudo apt-get install curl 
# sudo apt-get install gnupg 
# sudo apt-get install ca-certificates 
# sudo apt-get install lsb-release

# # Configure Docker Repo
# sudo mkdir -p /etc/apt/keyrings 
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# # Update and Upgrade
# sudo apt update
# sudo apt-get upgrade 

# # This step kept not finishing, but I used control-c to escape and it works?
# sudo dockerd

# # Install Docker and Docker Compose
# sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo usermod -aG docker $USER