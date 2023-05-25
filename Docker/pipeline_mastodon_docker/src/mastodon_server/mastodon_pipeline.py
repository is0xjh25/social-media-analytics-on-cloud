from mastodon import Mastodon
from happiness_mining import mastodon_happiness as mh
from happiness_mining import happiness_database as hd
import time
import couchdb
import json
import yaml


def read_config():
    with open("./data/mastodon-setting/api.yaml", encoding="UTF-8") as f:
        cfg = yaml.load(f, Loader=yaml.FullLoader)
        couch_password = cfg["COUCH_PASSWORD"]
        master_node = cfg["MASTER_NODE"]
        url_couch = f"http://{couch_password}@{master_node}"

        db_name = "mastodon"
        if "DB_NAME" in cfg:
            db_name = cfg["DB_NAME"]
        config = {
            "MASTODON_ACCESS_TOKEN": cfg["MASTODON_ACCESS_TOKEN"],
            "URL": cfg["URL"],
            "COUCHDB_URL": url_couch,
            "DB_NAME": db_name,
            "MODEL_PATH": "./happiness_mining/happy_model.sav",
            "VECTORIZOR_PATH": "./happiness_mining/happy_vector.sav",
        }
    return config

# Upload mapreduce functions
try:
    config = read_config()
    mastodob_t = hd.Couchdb(config["COUCHDB_URL"])
    db = mastodob_t.set_db(config["DB_NAME"])
    with open("./mapreduce_mastodon.json", "r") as fp:
        maps = json.load(fp)
        db.save(maps)
except Exception as e:
    print(e)

while True:
    try:
        config = read_config()
        m = Mastodon(
            api_base_url=config["URL"],
            access_token=config["MASTODON_ACCESS_TOKEN"],
        )
        m.stream_public(mh.HappinessListener(config))
        time.sleep(10)
    except Exception as e:
        print(e)
        config = read_config()
        time.sleep(10)