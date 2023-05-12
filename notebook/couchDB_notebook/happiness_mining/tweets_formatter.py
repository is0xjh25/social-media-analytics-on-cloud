from happiness_mining import scoring as hs
import pandas as pd
import json, ijson
import pickle


class tweets_formatter:
    """
    Read raw tweets json.

    Write json with GCC, happiness score and happiness behavious.
    """

    def __init__(self, config={}):
        self.sal = config["SAL_PATH"]
        self.model = pickle.load(open(config["MODEL_PATH"], "rb"))
        self.vectorizor = pickle.load(open(config["VECTORIZOR_PATH"], "rb"))
        self.scoring = hs.happiness_score()

    def happiness_behavour(self, tokens):
        try:
            tf_idf_vectorized = self.vectorizor.transform(tokens)
            df_tfdf = pd.DataFrame(
                tf_idf_vectorized.todense(), columns=self.vectorizer.get_feature_names()
            )
            prediction = self.model.predict(df_tfdf)
            return prediction[0]
        except Exception as e:
            # print(e)
            return None

    def extract(self, input_path, output_path):
        start = True
        with open(input_path, "rb") as f:
            with open(output_path, "w") as o:
                o.write("[\n")
                for tweet in ijson.items(f, "rows.item", multiple_values=True):
                    item = self.formatted(tweet)
                    if item is not None:
                        item["happiness_score"] = self.scoring.scoring_by_text(
                            item["tokens"]
                        )
                        item["happiness_behaviour"] = self.happiness_behavour(
                            item["tokens"]
                        )
                        if not start:
                            o.write(",\n")
                        json.dump(item, o, indent=2)
                        start = False
                o.write("\n]")

    def formatted(self, tweet):
        try:
            # check the data format
            if (
                "doc" in tweet
                and "data" in tweet["doc"]
                and "geo" in tweet["doc"]["data"]
                and tweet["doc"]["data"]["geo"]
                and "includes" in tweet["doc"]
                and "places" in tweet["doc"]["includes"]
                and "full_name" in tweet["doc"]["includes"]["places"][0]
                and tweet["doc"]["includes"]["places"][0]["full_name"]
            ):
                # Fill location data
                temp = {}
                temp["location"] = {}
                temp["location"]["full_name"] = None
                temp["location"]["gcc"] = None
                temp["location"]["suburb"] = None
                temp["location"] = self.read_loc(
                    tweet["doc"]["includes"]["places"][0]["full_name"], temp["location"]
                )
                if temp["location"]["gcc"] is None:
                    return None

                # fill meta data
                temp["post_id"] = tweet["id"]
                temp["author_id"] = tweet["doc"]["data"]["author_id"]
                temp["created_at"] = tweet["doc"]["data"]["created_at"]
                temp["content"] = tweet["doc"]["data"]["text"]
                temp["language"] = tweet["doc"]["data"].get("lang", "unknown")
                temp["sentiment"] = float(tweet["doc"]["data"]["sentiment"])
                temp["tags"] = self.string_split(tweet["value"]["tags"])
                temp["tokens"] = self.string_split(tweet["value"]["tokens"])
                return temp

        except Exception as e:
            # print(e)
            return None

        return None

    # Read the location
    def read_loc(self, location, temp):
        """
        Categorize the full name into gcc.
        """
        sal_data = json.load(open(self.sal, "r"))
        temp["full_name"] = location

        gcc = {
            "New South Wales": "(nsw)",
            "Victoria": "(vic.)",
            "Queensland": "(qld)",
            "South Australia": "(sa)",
            "Western Australia": "(wa)",
            "Tasmania": "(tas.)",
            "Northern Territory": "(nt)",
            "Australian Capital Territory": "(act)",
            "Great Other Territories": "(oter)",
        }

        loc = location.split(", ")

        if len(loc) == 2:
            if loc[1] in gcc:
                if loc[0].lower() in sal_data:
                    temp["gcc"] = sal_data[loc[0].lower()]["gcc"]
                    temp["suburb"] = sal_data[loc[0].lower()]["sal"]
                elif loc[0] + " " + gcc[loc[1]][0].lower() in sal_data:
                    temp["gcc"] = sal_data[loc[0] + " " + gcc[loc[1]][0].lower()]["gcc"]
                    temp["suburb"] = sal_data[loc[0] + " " + gcc[loc[1]][0].lower()][
                        "sal"
                    ]
        return temp

    def string_split(text):
        """
        Split full name of gcc
        returns list of splited words
        """
        if len(text) == 0:
            return []
        return text.split("|")
