import couchdb
import yaml
import ijson

SECRET_KEY = ""
with open('./happiness_mining/couch_key.yaml', 'r') as file:
    key = yaml.safe_load(file)
    SECRET_KEY = key["SECRET_KEY"]

couch = couchdb.Server(f'http://{SECRET_KEY}@172.26.132.37:5984/')


db_name = 'twitter'
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

input_path = "../../../volume/raw/tweets_location.json"
with open(input_path, "rb") as f:
    for tweet in ijson.items(f, "item", multiple_values=True):
        tweet['sentiment'] = str(tweet['sentiment'])
        db.save(tweet)

