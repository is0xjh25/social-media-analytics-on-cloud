#!/usr/bin/env bash
sudo docker pull jonghop/twitter-docker
sudo docker run -v /volume/data:/src/twitter_server/data --name twitter -d jonghop/twitter-docker