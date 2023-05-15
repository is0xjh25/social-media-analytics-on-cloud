from happiness_mining import scoring as hs
from happiness_mining import happiness_database as hd
from happiness_mining import nlp
from mastodon import Mastodon, StreamListener
import pickle
import pandas as pd


class HappinessListener(StreamListener):
    def __init__(self, config):
        self.model = pickle.load(open(config["MODEL_PATH"], "rb"))
        self.vectorizor = pickle.load(open(config["VECTORIZOR_PATH"], "rb"))
        self.couch = hd.Couchdb(config["COUCHDB_URL"])
        self.db = self.couch.set_db(config["DB_NAME"])

    def on_update(self, status):
        if "content" in status:
            language = status.get("language", "unknown")
            if language == "en":
                content = status["content"]
                model = hs.happiness_score()
                score = model.scoring_by_text(content)
                if score != 0:
                    author_id = status["account"]["id"]
                    created_at = str(status["created_at"])
                    tags = [tag["name"] for tag in status.get("tags", [])]
                    tokens = nlp.create_tokens(content)
                    happiness_behaviour = self.happiness_behavour(content)

                    if happiness_behaviour is not None:
                        data = {
                            "author_id": author_id,
                            "content": content,
                            "created_at": created_at,
                            "language": language,
                            "hashtags": tags,
                            "tokens": tokens,
                            "score": score,
                            "happiness_behaviour": happiness_behaviour,
                        }
                        # Only include necessary keys in the JSON output
                        keys_to_include = [
                            "account_id",
                            "content",
                            "created_at",
                            "language",
                            "hashtags",
                            "tokens",
                            "score",
                            "happiness_behaviour",
                        ]
                        filtered_data = {
                            k: v for k, v in data.items() if k in keys_to_include
                        }
                        self.db.save(filtered_data)

    def happiness_behavour(self, content):
        try:
            tf_idf_vectorized = self.vectorizor.transform(pd.Series([content]))
            df_tfdf = pd.DataFrame(
                tf_idf_vectorized.todense(),
                columns=self.vectorizor.get_feature_names_out(),
            )
            prediction = self.model.predict(df_tfdf)
            return prediction[0]
        except Exception as e:
            print(e)
            return None
