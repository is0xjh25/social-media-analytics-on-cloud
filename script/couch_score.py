import couchdb
import yaml
import ijson
from happiness_mining import scoring as hs
from happiness_mining import nlp

SECRET_KEY = ""
with open('couch_key.yaml', 'r') as file:
    key = yaml.safe_load(file)
    SECRET_KEY = key["SECRET_KEY"]

couch = couchdb.Server(f'http://{SECRET_KEY}@172.26.135.50:5984/')

db_name = 'twitter'
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]

model = hs.happiness_score()

for i in db:
    doc = db[i]
    # Scoring
    if doc['language'] == 'en' and 'happiness_score' not in doc:
        tokens = nlp.create_tokens(doc['content'])
        doc['happiness_score'] =  model.scoring_by_text(tokens)
        db.save(doc)