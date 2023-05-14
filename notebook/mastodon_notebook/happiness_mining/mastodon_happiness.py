from happiness_mining import scoring as hs
from happiness_mining import happiness_database as hd
from happiness_mining import nlp
from mastodon import Mastodon, StreamListener


class HappinessListener(StreamListener):
    def __init__(self, couch_url, db_name):
        self.couch = hd.Couchdb(couch_url)
        self.db = self.couch.set_db(db_name)

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
                    data = {
                        "author_id": author_id,
                        "content": content,
                        "created_at": created_at,
                        "language": language,
                        "hashtags": tags,
                        "tokens": tokens,
                        "score": score,
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
                    ]
                    filtered_data = {
                        k: v for k, v in data.items() if k in keys_to_include
                    }
                    self.db.save(filtered_data)
