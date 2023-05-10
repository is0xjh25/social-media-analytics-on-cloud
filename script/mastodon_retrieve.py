from mastodon import Mastodon, StreamListener
import csv, os, time, ijson, json, requests
import pandas as pd
import yaml
import pandas as pd
from happiness_mining import scoring as hs
from happiness_mining import nlp

divide_line = "________________________________________"


def format_tweet(tweet):
    temp = {}
    temp["post_id"] = tweet["id"]
    temp["author_id"] = tweet["doc"]["data"]["author_id"]
    temp["created_at"] = tweet["doc"]["data"]["created_at"]
    temp["content"] = tweet["doc"]["data"]["text"]
    # waiting for update
    temp["location"] = tweet["doc"]["data"]["geo"]
    temp["language"] = tweet["doc"]["data"].get("lang", "unknown")
    temp["sentiment"] = float(tweet["doc"]["data"]["sentiment"])
    temp["tags"] = string_split(tweet["value"]["tags"])
    temp["tokens"] = string_split(tweet["value"]["tokens"])
    return temp


def string_split(text):
    if len(text) == 0:
        return []
    return text.split("|")


def streaming_mastodon() -> None:
    # Retrieve keys
    with open("./api.yaml", encoding="UTF-8") as f:
        cfg = yaml.load(f, Loader=yaml.FullLoader)
        m = Mastodon(
            api_base_url=f"https://mastodon.au",
            access_token=cfg["MASTODON_ACCESS_TOKEN"],
        )
        m.stream_public(Listener())
    return None


def retrieve_mastodon(keyword):
    url = "https://mastodon.au/api/v2/search"
    mastodons = []
    with open("./api.yaml", encoding="UTF-8") as f:
        cfg = yaml.load(f, Loader=yaml.FullLoader)
        headers = {
            "Authorization": f'Bearer {cfg["MASTODON_ACCESS_TOKEN"]}',
            "Content-Type": "application/json",
        }
        params = {"q": keyword}
        response = requests.get(url, headers=headers, params=params)

        for mastodon in ijson.items(
            response.text, "accounts.item", multiple_values=True
        ):
            temp = {}
            temp["author_id"] = mastodon["id"]
            temp["content"] = mastodon["note"]
            temp["created_at"] = mastodon["created_at"]
            temp["language"] = mastodon.get("language", "unknown")
            temp["hashtags"] = [tag["name"] for tag in mastodon.get("tags", [])]
            mastodons.append(temp)
        return mastodons


def print_formatted(posts) -> None:
    path = "../data/raw/mastodon.csv"
    model = hs.happiness_score()
    latest_scores = []
    for post in posts:
        post = json.loads(post)
        score = model.scoring_by_text(post["content"])
        df = pd.DataFrame(
            {
                "content": [post["content"]],
                "created_at": [post["created_at"]],
                "hashtags": [post["hashtags"]],
                "language": [post["language"]],
                "t_score": [score],
            }
        )
        latest_scores.append(score)
        if os.path.exists(path):
            df.to_csv(path, mode="a", index=False, header=False)
        else:
            df.to_csv(path, index=False)

    print(latest_scores)
    if len(latest_scores) > 0:
        avg = sum(latest_scores) / len(latest_scores)
        if avg < 5.5:
            print("😭 (Below 5.5)", latest_scores)
        else:
            print("😆 (Above 5.5)", latest_scores)
        latest_scores = latest_scores[-9:]
    return None


class Listener(StreamListener):
    def on_update(self, status):
        if "content" in status:
            author_id = status["account"]["id"]
            content = status["content"]
            created_at = status["created_at"]
            language = status.get("language", "unknown")
            tags = [tag["name"] for tag in status.get("tags", [])]
            data = {
                "author_id": author_id,
                "content": content,
                "created_at": created_at,
                "language": language,
                "hashtags": tags,
            }
            # Only include necessary keys in the JSON output
            keys_to_include = [
                "account_id",
                "content",
                "created_at",
                "language",
                "hashtags",
            ]
            filtered_data = {k: v for k, v in data.items() if k in keys_to_include}
            print_formatted(
                [json.dumps(filtered_data, indent=2, sort_keys=True, default=str)]
            )
