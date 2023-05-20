#!/usr/bin/env bash
sudo docker pull jonghop/mastodon-docker
sudo docker run -v /volume/data:/app/data -p 5000:5000 -d jonghop/flask-docker