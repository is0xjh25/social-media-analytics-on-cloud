# reference https://youtu.be/bluclMxiUkA

from lib2to3.pgen2.pgen import DFAState
import string
import numpy as np
from flask import Flask, request, render_template, json, jsonify
import pickle
import os
import pandas as pd
import folium
from markupsafe import escape
import couchdb
import plotly.graph_objects as go
from plotly.utils import PlotlyJSONEncoder
import plotly.io as pio
import plotly
import plotly.express as px
import json



#Create an app object using the Flask class. 
app = Flask(__name__)


#Load the trained model. (Pickle file)

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)
print(dname)

@app.route('/db/')
def my_view_function():
    # Connect to CouchDB
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    
    # Query the view
    view_result = db.view('_design/agg/_view/ave-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    keys = [row['key'] for row in result]
    ave = [row['value']['avg'] for row in result]

    fig = go.Figure([go.Bar(x=keys, y=ave)])
    fig.update_layout(yaxis_range=[5.6, 6.1])
    chart_data = json.dumps(fig, cls=PlotlyJSONEncoder)
    # Convert figure to JSON-serializable format
    # chart_data = json.dumps(fig, cls=PlotlyJSONEncoder)
    # Render the template with the result
    return render_template('my_template.html', result = result, chart_data=chart_data)

@app.route('/')
def home():
    return render_template('index2.html')

#---------------------------test--------------------------
@app.route('/graph')
def notdash():
   df = pd.DataFrame({
      'Fruit': ['Apples', 'Oranges', 'Bananas', 'Apples', 'Oranges', 'Bananas'],
      'Amount': [4, 1, 2, 2, 4, 5],
      'City': ['SF', 'SF', 'SF', 'Montreal', 'Montreal', 'Montreal']
   })
   fig = px.bar(df, x='Fruit', y='Amount', color='City',    barmode='group')
   graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
   return render_template('notdash2.html', graphJSON=graphJSON)

#---------------------------s1--------------------------

@app.route('/s1/')
def s1():
    return render_template('s1.html')

@app.route('/s1/#s1.1')
def s1_1():
    return render_template('s1.html')

@app.route('/s1/#s1.2')
def s1_2():
    return render_template('s1.html')
@app.route('/s1/#s1.3')
def s1_3():
    return render_template('s1.html')
@app.route('/s1/#s1.4')
def s1_4():
    return render_template('s1.html')
#---------------------------s2--------------------------
@app.route('/s2/')
def s2():
    return render_template('s2.html')
@app.route('/s2/#s2.1')
def s2_1():
    return render_template('s2.html')

@app.route('/s2/#s2.2')
def s2_2():
    return render_template('s2.html')
@app.route('/s2/#s2.3')
def s2_3():
    return render_template('s2.html')
@app.route('/s2/#s2.4')
def s2_4():
    return render_template('s2.html')

#---------------------------s3--------------------------
@app.route('/s3/')
def s3():
    return render_template('s3.html')
@app.route('/s3/#s3.1')
def s3_1():
    return render_template('s3.html')

@app.route('/s3/#s3.2')
def s3_2():
    return render_template('s3.html')
@app.route('/s3/#s3.3')
def s3_3():
    return render_template('s3.html')
@app.route('/s3/#s3.4')
def s3_4():
    return render_template('s3.html')

if __name__ == '__main__':
    app.run(debug=True)
'''if __name__=="__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'), 
            port=int(os.getenv('PORT', 4444)))'''