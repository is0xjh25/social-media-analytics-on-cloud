from mastodon import Mastodon
from happiness_mining import mastodon_happiness as mh

import yaml

url_couch = "http://jim:jimistired@172.26.132.37:5984"
db_name = "mastodon"

with open("./api.yaml", encoding="UTF-8") as f:
    cfg = yaml.load(f, Loader=yaml.FullLoader)
    m = Mastodon(
        api_base_url=f"https://mastodon.au",
        access_token=cfg["MASTODON_ACCESS_TOKEN"],
    )
    m.stream_public(mh.HappinessListener(url_couch, db_name))