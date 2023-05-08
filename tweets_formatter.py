import json, ijson, configparser

# Configuration !!!
# Change the env, check config.ini
env = "grace"
config = configparser.ConfigParser()
config.read("config.ini")
data_url = config[env]["DATA_URL"]
sal_url = config[env]["SAL_URL"]
max_row = int(config[env]["MAX_ROW"])


def analyse():
    res = []
    count = 0
    with open(data_url, "rb") as f:
        for tweet in ijson.items(f, "rows.item", multiple_values=True):
            count += 1
            res.append(formatted(tweet))
            if count == max_row:
                break
    return res


def extract(out_path, input_path=data_url):
    start = True
    with open(input_path, "rb") as f:
        with open(out_path, "w") as o:
            o.write("[\n")
            for tweet in ijson.items(f, "rows.item", multiple_values=True):
                item = formatted(tweet)
                if item["location"]["full_name"] is not None:
                    if not start:
                        o.write(",\n")
                    json.dump(item, o, indent=2)
                    start = False
            o.write("\n]")


def formatted(tweet):
    temp = {}
    temp["post_id"] = tweet["id"]
    temp["author_id"] = tweet["doc"]["data"]["author_id"]
    temp["created_at"] = tweet["doc"]["data"]["created_at"]
    temp["content"] = tweet["doc"]["data"]["text"]
    # waiting for update
    temp["location"] = {}
    temp["location"]["full_name"] = None
    temp["location"]["gcc"] = None
    temp["location"]["suburb"] = None
    if tweet["doc"]["data"]["geo"]:
        if tweet["doc"]["includes"]["places"][0]["full_name"]:
            temp["location"] = read_loc(
                tweet["doc"]["includes"]["places"][0]["full_name"], temp["location"]
            )
    temp["language"] = tweet["doc"]["data"].get("lang", "unknown")
    temp["sentiment"] = float(tweet["doc"]["data"]["sentiment"])
    temp["tags"] = string_split(tweet["value"]["tags"])
    temp["tokens"] = string_split(tweet["value"]["tokens"])
    return temp


# Read the location
def read_loc(location, temp):
    sal_data = json.load(open(sal_url, "r"))
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

    city = {
        "Sydney": "1gsyd",
        "Melbourne": "2gmel",
        "Brisbane": "3gbri",
        "Adelaide": "4gade",
        "Perth": "5gper",
        "Tasmania": "6ghob",
        "Darwin": "7gdar",
    }

    loc = location.split(", ")

    if len(loc) == 2:
        if loc[1] in gcc:
            if loc[0].lower() in sal_data:
                temp["gcc"] = sal_data[loc[0].lower()]["gcc"]
                temp["suburb"] = sal_data[loc[0].lower()]["sal"]
            elif loc[0] + " " + gcc[loc[1]][0].lower() in sal_data:
                temp["gcc"] = sal_data[loc[0] + " " + gcc[loc[1]][0].lower()]["gcc"]
                temp["suburb"] = sal_data[loc[0] + " " + gcc[loc[1]][0].lower()]["sal"]
    return temp


def string_split(text):
    if len(text) == 0:
        return []
    return text.split("|")
