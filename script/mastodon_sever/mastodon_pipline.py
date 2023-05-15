from mastodon import Mastodon
from happiness_mining import mastodon_happiness as mh
import time
import yaml

url_couch = "http://admin:admin@localhost:5984"
db_name = "mastodon"
config = {
    "COUCHDB_URL": url_couch,
    "DB_NAME": db_name,
    "MODEL_PATH": "./happiness_mining/happy_model.sav",
    "VECTORIZOR_PATH": "./happiness_mining/happy_vector.sav",
}


with open("./api.yaml", encoding="UTF-8") as f:
    cfg = yaml.load(f, Loader=yaml.FullLoader)
    while True:
        try:
            m = Mastodon(
                api_base_url=f"https://mastodon.au",
                access_token=cfg["MASTODON_ACCESS_TOKEN"],
            )
            m.stream_public(mh.HappinessListener(config))
            time.sleep(10)
        except Exception as e:
            print(e)
            time.sleep(10)
