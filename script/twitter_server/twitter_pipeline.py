from happiness_mining import twitter
from happiness_mining import happiness_database as hd
import json

config = {
    "SAL_PATH": "./happiness_mining/sal.json",
    "MODEL_PATH": "./happiness_mining/happy_model.sav",
    "VECTORIZOR_PATH": "./happiness_mining/happy_vector.sav",
}

# Create twitter Class
try:
    tt = twitter.tweets_formatter(config)

    # Set configurations
    input_path = "../../data/raw/sample_tweets.json"
    # output_path = "./testing_pipeline.json"
    url_couch = "http://admin:admin@localhost:5984"
    db_name = "twitter"

    # Connect CouchDB
    twitter_t = hd.Couchdb(url_couch)
    db_t = twitter_t.set_db(db_name)

    # Set Mapreduce Functions
    try:
        with open("./mapreduce_functions.json", "r") as f:
            design_doc = json.load(f)
            db_t.save(design_doc)
    except Exception as e:
        print(e)

    # Upload Tweets to CouchDB
    tt.extract_to_couch(input_path, url_couch, db_name)

except Exception as e:
    print(e)
