from happiness_mining import twitter
from happiness_mining import happiness_database as hd
import json

config = {"SAL_PATH":"./happiness_mining/sal.json", "MODEL_PATH":"./happiness_mining/happy_model.sav", "VECTORIZOR_PATH":"./happiness_mining/happy_vector.sav"}

tt =twitter.tweets_formatter(config)

# input_path = "./mnt/ext100/twitter-huge.json"
input_path = "./sample_tweets.json"
output_path = "./testing_pipeline.json"
url_couch = "http://admin:admin@localhost:5984"
db_name = "twitter555"

twitter_t = hd.Couchdb(url_couch)
db = twitter_t.set_db(db_name)

try:
    with open("./mapreduce_twitter.json", "r") as fp:
        maps = json.load(fp)
        db.save(maps)
except Exception as e:
    print(e)

tt.extract_to_couch(input_path, url_couch, db_name)