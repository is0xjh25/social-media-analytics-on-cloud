#!/usr/bin/env bash
docker pull jonghop/twitter-docker
docker run -v /volume/data:/src/twitter_server/data --name twitter -d jonghop/twitter-docker