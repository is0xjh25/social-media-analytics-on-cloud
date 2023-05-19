#!/usr/bin/env bash
docker pull jonghop/react-docker
docker run -p 3000:3000 --name frontend -d react-docker