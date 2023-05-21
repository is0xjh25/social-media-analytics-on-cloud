#!/usr/bin/env bash
docker pull jonghop/mastodon-docker
docker run -v /volume/data:/src/mastodon_server/data --name mastodon -d jonghop/mastodon-docker