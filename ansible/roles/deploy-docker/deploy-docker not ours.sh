# Remove old version of Docker
- name: Remove old version of Docker
  tags: 'docker'
  become: yes
  apt:
    name: ['docker','docker-engine','docker.io']
    state: absent
    
# Install dependencies
- name: Install dependencies
  tags: 'docker'
  become: yes
  apt:
    name: ['apt-transport-https','build-essential','python3-pip','ca-certificates','curl','gnupg-agent','software-properties-common','git','python3-dev','python3-setuptools','software-properties-common','unzip','vim']
    state: latest
    install_recommends: no
    update_cache: yes

# Add Docker Repo key
- name: Add Docker apt repository key
  tags: 'docker'
  apt_key:
    url: https://download.docker.com/linux/ubuntu/gpg
    state: present

# Add Docker apt repo and update apt cache
- name: Add Docker apt repo and update apt cache
  tags: 'docker'
  become: yes
  apt_repository:
    repo: "deb https://download.docker.com/linux/{{ ansible_distribution|lower }} {{ ansible_distribution_release }} stable"
    mode: '664'
    update_cache: yes
    state: present

# Install Docker
- name: Install Docker
  tags: 'docker'
  become: yes
  apt:
    name: ['docker-ce']
    state: latest
    install_recommends: no
    update_cache: yes

# Install Docker-Compose
- name: Install docker-compose
  tags: 'docker'
  become: yes
  pip:
    name: ['docker-compose']
    state: latest

- name: mkdir /etc/systemd/system/docker.service.d
  tags: 'create proxy directory'
  become: yes
  file:
    path: "{{ docker_env }}"
    state: directory
    recurse: yes


- name: move http-proxy.conf
  tags: 'move http-proxy.conf in server'
  become: yes
  template:
    src: http-proxy.conf
    dest: "{{ docker_env }}"
    
# Restart Daemon and Docker
- name: Restart Daemon and Docker
  become: yes
  systemd:
    state: restarted
    daemon_reload: yes
    name: docker