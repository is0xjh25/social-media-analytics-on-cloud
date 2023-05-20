from flask import Flask, jsonify,make_response
import os
import couchdb
from flask_caching import Cache
from flask_cors import CORS
from flask_cors import cross_origin
import threading
import yaml
import time

isRead = False
while not isRead:
    try:
        with open("./data/flask-setting/api.yaml", encoding="UTF-8") as f:
            cfg = yaml.load(f, Loader=yaml.FullLoader)
            couch_password = cfg["COUCH_PASSWORD"]
            master_node = cfg["MASTER_NODE"]
            threshold = cfg["THRESHOLD"]
            last_server = cfg["LAST_SERVER"]
            isRead = True
    except Exception as e:
        print(e)
        isRead = False
        time.sleep(10)

#Create an app object using the Flask class. 
app = Flask(__name__)
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


#Load the trained model. (Pickle file)

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)
print(dname)

FORWARDING = False
request_counter = 0

def reset_counter():
    global request_counter
    request_counter = 0
    threading.Timer(60, reset_counter).start()

reset_counter()

@app.before_request
def increment_request_counter():
    global request_counter
    global FORWARDING
    request_counter += 1
    if request_counter > threshold and last_server is not True:
        FORWARDING = True
    else:
        FORWARDING = False
    print("Received request number:", request_counter, "Forwarding:", FORWARDING)

@app.route('/status')
def status():
    return jsonify({'status': FORWARDING})

@app.route('/s1_data')
@cross_origin()
def combinedData():
    global FORWARDING
    if FORWARDING:
        return jsonify({'forwarding': True, 'result_1': None, 'result_2': None, 'result_3': None})
    else:
        try:
            couch = couchdb.Server(f'http://{couch_password}@{master_node}')
            db_t = couch['twitter']
            db_m = couch['mastodon']

            view_result_1 = db_t.view('_design/happiness_doc/_view/score-hour-view', reduce=True, group=True)
            result_1 = [{'key': row.key, 'value': row.value} for row in view_result_1]

            view_result_2 = db_t.view('_design/happiness_doc/_view/score-month-view', reduce=True, group=True)
            result_2 = [{'key': row.key, 'value': row.value} for row in view_result_2]

            view_result_3 = db_t.view('_design/happiness_doc/_view/score-dow-view', reduce=True, group=True)
            result_3 = [{'key': row.key, 'value': row.value} for row in view_result_3]

            view_result_4 = db_m.view('_design/happiness_doc/_view/score-hour-view', reduce=True, group=True)
            result_4 = [{'key': row.key, 'value': row.value} for row in view_result_4]

            view_result_5 = db_m.view('_design/happiness_doc/_view/score-dow-view', reduce=True, group=True)
            result_5 = [{'key': row.key, 'value': row.value} for row in view_result_5]

            return jsonify({'forwarding': False, 'result_1': result_1, 'result_2': result_2, 'result_3': result_3
                            ,'result_4': result_4,'result_5': result_5})
        except Exception as e:
            return make_response(jsonify(error=str(e)), 500)

@app.route('/s2_data')
@cross_origin()
def gcc_all_data():
    global FORWARDING
    if FORWARDING:
        return jsonify({'forwarding': True, 'result_1': None, 'result_2': None})
    else:
        try:
            couch = couchdb.Server(f'http://{couch_password}@{master_node}')
            db = couch['twitter']            
            state_view_result_1 = db.view('_design/happiness_doc/_view/score-state-view', reduce=True, group=True)
            state_result_1 = [{'key': row.key, 'value': row.value} for row in state_view_result_1]
            score_view_result_2 = db.view('_design/happiness_doc/_view/score-gcc-view', reduce=True, group=True)
            state_result_2 = [{'key': row.key, 'value': row.value} for row in score_view_result_2]
            return jsonify({'forwarding': False, 'result_1': state_result_1, 'result_2': state_result_2})
        except Exception as e:
            return make_response(jsonify(error=str(e)), 500)
        
@app.route('/s3_data')
@cross_origin()
def mastdon_b():
    global FORWARDING
    if FORWARDING:
        return jsonify({'forwarding': True, 'result': None})
    else:
        try:
            couch = couchdb.Server(f'http://{couch_password}@{master_node}')
            db = couch['mastodon']
            view_result = db.view('_design/happiness_doc/_view/behaviour-dow-view', reduce=True, group=True)
            result = [{'key': row.key, 'value': row.value} for row in view_result]
            return jsonify({'forwarding': False, 'result': result})
        except Exception as e:
            return make_response(jsonify(error=str(e)), 500)

if __name__ == '__main__':
    app.run(debug=True)