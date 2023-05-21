#!/usr/bin/env bash
docker pull jonghop/flask-docker
docker run -v /home/ubuntu/data:/app/data -p 5000:5000 --name backend -d jonghop/flask-docker