from happiness_mining import twitter
from happiness_mining import happiness_database as hd
import json
import yaml

config = {"SAL_PATH":"./happiness_mining/sal.json", "MODEL_PATH":"./happiness_mining/happy_model.sav", "VECTORIZOR_PATH":"./happiness_mining/happy_vector.sav"}

tt =twitter.tweets_formatter(config)

with open("./data/twitter-setting/api.yaml", encoding="UTF-8") as f:
    cfg = yaml.load(f, Loader=yaml.FullLoader)
    couch_password = cfg["COUCH_PASSWORD"]
    master_node = cfg["MASTER_NODE"]

input_path = "./data/twitter-huge.json"
url_couch = f"http://{couch_password}@{master_node}"
db_name = "twitter"

twitter_t = hd.Couchdb(url_couch)
db = twitter_t.set_db(db_name)

try:
    with open("./mapreduce_twitter.json", "r") as fp:
        maps = json.load(fp)
        db.save(maps)
except Exception as e:
    print(e)

tt.extract_to_couch(input_path, url_couch, db_name, 10)