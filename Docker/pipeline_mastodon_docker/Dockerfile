FROM python:3.10

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY ./src ./src
WORKDIR "/src/mastodon_server"

CMD ["python", "mastodon_pipeline.py"]npm