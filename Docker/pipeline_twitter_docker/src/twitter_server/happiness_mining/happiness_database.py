import couchdb
import json
import requests

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

    def bulk_update(self, dict_list):
        headers = {
            "Accept": "application/json",
            "Content-type": "application/json",
        }
        r = requests.post(
            f"{self.url}/{self.db_name}/_bulk_docs",
            data=json.dumps({"docs": dict_list}),
            headers=headers,
        )
        return r.json()
