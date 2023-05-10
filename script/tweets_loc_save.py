import couchdb
import ijson
import post

tweet_path = "./data/raw/tweets.json"

couch = couchdb.Server("http://admin:admin@localhost:5984/")

db = couch.create("twitter_loc")
db = couch["twitter_loc"]

with open(tweet_path, "rb") as f:
    for tweet in ijson.items(f, "rows.item", multiple_values=True):
        if "place_id" in tweet["doc"]["data"]["geo"]:
            db.save(post.format_tweet(tweet))
