#!/usr/bin/env bash
docker pull jonghop/react-docker
docker run -v /home/ubuntu/data:/app/data -p 3000:3000 --name frontend -d jonghop/react-docker