#!/usr/bin/env bash
docker pull jonghop/flask-docker
docker run -v /volume/data:/app/data -p 5000:5000 -d jonghop/flask-docker