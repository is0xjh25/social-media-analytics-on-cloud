FROM python:3.10

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY ./src ./src
WORKDIR "/src/twitter_server"

CMD ["python3", "twitter_pipeline.py"]