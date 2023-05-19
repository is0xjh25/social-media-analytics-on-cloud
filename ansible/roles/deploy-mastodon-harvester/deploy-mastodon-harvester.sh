#!/usr/bin/env bash
sudo docker pull jonghop/mastodon-docker
sudo docker run -v /volume/data:/src/mastodon_server/data --name mastodon -d jonghop/mastodon-docker