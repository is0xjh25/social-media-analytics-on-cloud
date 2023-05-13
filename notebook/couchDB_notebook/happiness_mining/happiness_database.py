import couchdb
import yaml
import ijson
import requests

SECRET_KEY = ""
with open("./happiness_mining/couch_key.yaml", "r") as file:
    key = yaml.safe_load(file)
    SECRET_KEY = key["SECRET_KEY"]

# couch = couchdb.Server(f"http://{SECRET_KEY}@172.26.132.37:5984/")


# db_name = "twitter"
# if db_name not in couch:
#     db = couch.create(db_name)
# else:
#     db = couch[db_name]

# input_path = "../../../volume/raw/tweets_location.json"
# with open(input_path, "rb") as f:
#     for tweet in ijson.items(f, "item", multiple_values=True):
#         tweet["sentiment"] = str(tweet["sentiment"])
#         db.save(tweet)


class Couchdb:
    def __init__(self, url):
        self.url = url
        self.couch = couchdb.Server(self.url)
        self.db = None
        self.db_name = None
        self.map = None

    def set_db(self, db_name):
        self.db_name = db_name
        if db_name not in self.couch:
            # self.db = couch.create(db_name)
            r = requests.put(
                f"{self.url}/{db_name}"  # ,
                # params={"partitioned": "true"},
            )

        self.db = self.couch[db_name]

        return self.db

    def save_doc(self, doc):
        if self.db is not None:
            self.db.save(doc)
        else:
            print("Database is not defined")

    def apply_mapreduce(self, design_name, view_name, map):
        if self.db is not None:
            design_doc = {
                "_id": f"_design/{design_name}",
                "views": {
                    f"{view_name}": map,
                },
                "language": "javascript",
            }

            # updating
            if f"_design/{design_name}" in self.db:
                design_doc["_rev"] = self.db[f"_design/{design_name}"]["_rev"]

            # save design document
            self.db.save(design_doc)
        else:
            print("Database is not defined")

    def view_mapreduce(self, design_doc_name, view_name):
        r = requests.get(
            f"{self.url}/{self.db_name}/_design/{design_doc_name}/_view/{view_name}?group=true&reduce=true"
            # params={"partitioned": "true"}
        )
        return r.json()
