#!/usr/bin/env bash
docker pull jonghop/flask-docker
docker run -p 5000:5000 --name backend -d flask-docker