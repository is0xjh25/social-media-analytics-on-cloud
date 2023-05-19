# reference https://youtu.be/bluclMxiUkA

from lib2to3.pgen2.pgen import DFAState
import string
import numpy as np
from flask import Flask, request, render_template, json, jsonify,make_response
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
import geopandas as gpd
from flask_caching import Cache
from flask_cors import CORS
from flask_cors import cross_origin
import threading



#Create an app object using the Flask class. 
app = Flask(__name__)
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


#Load the trained model. (Pickle file)

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)
print(dname)

request_counter = 0

def reset_counter():
    global request_counter
    request_counter = 0
    # 重新设置定时器
    threading.Timer(60, reset_counter).start()


reset_counter()

@app.before_request
def increment_request_counter():
    global request_counter
    request_counter += 1
    print("Received request number:", request_counter)


GLOBAL_STATE = False

@app.route('/status')
def status():
    global request_counter
    global GLOBAL_STATE
    if request_counter >10:
        GLOBAL_STATE = True
    else:
        GLOBAL_STATE = False
    return jsonify({'status': GLOBAL_STATE})


@app.route('/db/',methods=['GET'])
def my_view_function():
    # Connect to CouchDB
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    # Query the view
    view_result = db.view('_design/agg/_view/gcc-score-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    keys = [row['key'] for row in result]
    keys = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

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


#---------------------------s1--------------------------

@app.route('/s1/',methods=['GET'])
def s1():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    # Query the view
    view_result = db.view('_design/agg/_view/month-agg-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    #keys = [row['key'] for row in result]
    keys = ['2022-02', '2022-03', '2022-04', '2022-05', '2022-06', '2022-07', '2022-08']
    ave = [row['value']['avg'] for row in result]

    fig = go.Figure([go.Line(x=keys, y=ave)])
    fig.add_vrect(x0="2022-03", x1="2022-06", 
              annotation_text="incline", annotation_position="top left",
              fillcolor="red", opacity=0.1, line_width=0)
    fig.update_layout(yaxis_range=[5.8, 6],
        xaxis_title='Month',
        yaxis_title='Happiness Score',
        yaxis_showgrid=True,
        yaxis_gridcolor='lightgrey',
        plot_bgcolor='white')
    fig.add_hline(y=5.8,line_color='lightgrey')
    fig.add_hline(y=6,line_color='lightgrey')
    fig.add_trace(go.Line(x=keys, y=ave, name='Average Score'))
    chart_data = json.dumps(fig, cls=PlotlyJSONEncoder)
    # Convert figure to JSON-serializable format
    # chart_data = json.dumps(fig, cls=PlotlyJSONEncoder)
    # Render the template with the result

    # ---------------------------------------------------------------------------
    view_result = db.view('_design/agg/_view/hour-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    keys = [row['key'] for row in result]
    ave = [row['value']['avg'] for row in result]

    morning = range(6, 12)
    afternoon = range(12, 18)
    evening = range(18, 22)
    late_night = list(range(22, 24)) + list(range(0, 6))

    colors = []
    for hour in keys:
        if hour in morning:
            colors.append('#fddbc7')  # orange
        elif hour in afternoon:
            colors.append('#f4a582')  # green
        elif hour in evening:
            colors.append('#92c5de')  # blue
        else:
            colors.append('#2166ac')  # purple

    fig = go.Figure(data=[go.Bar(x=keys, y=ave, marker_color=colors)])
    fig.add_vrect(x0="6", x1="9", 
            annotation_text="decline", annotation_position="top left",
            fillcolor="grey", opacity=0.25, line_width=0)
    fig.add_vrect(x0="13", x1="18", 
        annotation_text="incline", annotation_position="top left",
        fillcolor="red", opacity=0.1, line_width=0)
    fig.update_layout(
        yaxis_range=[5.8, 6.00],
        xaxis=dict(
            tickmode='linear',
            dtick=1,
            tickvals=keys,
            ticktext=['{}:00'.format(h) for h in keys]),
        xaxis_title='Hour',
        yaxis_title='Happiness Score',
        yaxis_gridcolor='lightgrey',
        plot_bgcolor='white')
    fig.add_hline(y=6,line_color='lightgrey')
    fig.add_hline(y=5.91526, line_dash="dot",
                annotation_text="AU baseline (5.91526)", 
                annotation_position="top left")
    
    
    chart_data2 = json.dumps(fig, cls=PlotlyJSONEncoder)
    # ---------------------------------------------------------------------------
    view_result = db.view('_design/agg/_view/dow-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    keys = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    ave = [row['value']['avg'] for row in result]
    colors = ['#fddbc7','#fddbc7','#fddbc7','#fddbc7','#fddbc7','#f4a582','#f4a582']
    fig = go.Figure([go.Bar(x=keys, y=ave, marker_color=colors)])
    fig.update_layout(yaxis_range=[5.8, 6],
                      xaxis_title='Day of Week',
                      yaxis_title='Happiness Score',
                      yaxis_gridcolor='lightgrey',
                      plot_bgcolor='white')
    fig.add_hline(y=6,line_color='lightgrey')
    fig.add_hline(y=5.91526, line_dash="dot",
                annotation_text="AU baseline (5.91526)", 
                annotation_position="bottom right")
    chart_data3 = json.dumps(fig, cls=PlotlyJSONEncoder)

    return render_template('s1.html', chart_data=chart_data, chart_data2=chart_data2, chart_data3 = chart_data3)

@app.route('/s1/#s1.1')
def s1_1():
    return render_template('s1.html')


# test
@app.route('/test1')
@cross_origin()
def first_test():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/gcc-score-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)


@app.route('/gccWeekend')
@cross_origin()
def gccWeekend():
    couch = couchdb.Server('http://admin:admin@172.26.131.83:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/dow-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    # print(result)
    return jsonify(result)

@app.route('/gccMonth')
@cross_origin()
def gccMonth():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/month-agg-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)

@app.route('/gccCount')
@cross_origin()
def gccCount():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/state-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)


@app.route('/gccCount2')
@cross_origin()
def gccCount_2():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/gcc-score-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    print(result)
    return jsonify(result)



from flask import Flask, jsonify

app = Flask(__name__)

GLOBAL_STATE = False

@app.route('/s1_data')
@cross_origin()
def combinedData():
    # global state value

    if GLOBAL_STATE:
        return jsonify({'state': True, 'result_1': None, 'result_2': None, 'result_3': None})
    else:
        try:
            couch = couchdb.Server('http://admin:admin@localhost:5984')
            db = couch['twitter']

            # 1st view result
            view_result_1 = db.view('_design/agg/_view/hour-view', reduce=True, group=True)
            result_1 = [{'key': row.key, 'value': row.value} for row in view_result_1]

            # 2nd view result
            view_result_2 = db.view('_design/agg/_view/month-agg-view', reduce=True, group=True)
            result_2 = [{'key': row.key, 'value': row.value} for row in view_result_2]

            # 3rd view result
            view_result_3 = db.view('_design/agg/_view/dow-view', reduce=True, group=True)
            result_3 = [{'key': row.key, 'value': row.value} for row in view_result_3]

            return jsonify({'state': False, 'result_1': result_1, 'result_2': result_2, 'result_3': result_3})

        except Exception as e:
            return make_response(jsonify(error=str(e)), 500)



@app.route('/s2_data')
@cross_origin()
def gcc_all_data():
    if GLOBAL_STATE:
        return jsonify({'state': True, 'result_1': None, 'result_2': None})
    else:
        try:
            couch = couchdb.Server('http://admin:admin@localhost:5984')
            db = couch['twitter']

            state_view_result_1 = db.view('_design/agg/_view/state-view', reduce=True, group=True)
            state_result_1 = [{'key': row.key, 'value': row.value} for row in state_view_result_1]

            score_view_result_2 = db.view('_design/agg/_view/gcc-score-view', reduce=True, group=True)
            state_result_2 = [{'key': row.key, 'value': row.value} for row in score_view_result_2]

            return jsonify({'state': False, 'result_1': state_result_1, 'result_2': state_result_2})

        except Exception as e:
            return make_response(jsonify(error=str(e)), 500)
        


@app.route('/mastodon')
@cross_origin()
def mastdon():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['mastodon']
    view_result = db.view('_design/happiness_doc/_view/score-hour-view', reduce=True, group=True)
    print(view_result)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)


@app.route('/mastodon_w')
@cross_origin()
def mastdon_week():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['mastodon']
    view_result = db.view('_design/happiness_doc/_view/score-dow-view', reduce=True, group=True)
    print(view_result)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)


@app.route('/mastodon_b')
@cross_origin()
def mastdon_b():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['mastodon']
    view_result = db.view('_design/happiness_doc/_view/behaviour-dow-view', reduce=True, group=True)
    print(view_result)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)


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
@cache.cached(timeout=3600)




def s2():
    # Connect to CouchDB
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    # Query the view
    view_result = db.view('_design/agg/_view/gcc-score-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    keys = [row['key'] for row in result]
    ave = [row['value']['avg'] for row in result]

    ave_color = ['#f4a582' if a >= 5.91526 else '#fddbc7' for a in ave]
    fig = go.Figure([go.Bar(x=keys, y=ave,marker_color=ave_color)])
    fig.update_layout(yaxis_range=[5.6, 6.1],
        xaxis_title='Greater Capital Cities',
        yaxis_title='Happiness Score',
        yaxis_showgrid=True,
        yaxis_gridcolor='lightgrey',
        plot_bgcolor='white')
    fig.add_hline(y=5.91526, line_dash="dot",
                annotation_text="AU baseline (5.91526)", 
                annotation_position="bottom right")    

    chart_data = json.dumps(fig, cls=PlotlyJSONEncoder)


    gdf = gpd.read_file("../data/curated/GCCSA_2021_AUST_SHP_GDA2020/GCCSA_2021_AUST_GDA2020.shp")
    geoJSON = gpd.read_file("../data/curated/gcc_geojson.geojson")
    df = pd.DataFrame({"gcc":keys, "happiness_score":ave})
    df['gcc'] = df['gcc'].str.upper()
    gdf2 = pd.merge(gdf, df, how='left', left_on='GCC_CODE21', right_on = 'gcc')
    m = folium.Map(location=[-25.2744, 133.7751], tiles="cartodbpositron", zoom_start=4, color='white')
    svg_style = '<style>svg {background-color: rgb(255, 255, 255,0.5);}</style>'
    m.get_root().header.add_child(folium.Element(svg_style))

    c = folium.Choropleth(
        geo_data=geoJSON,
        name='choropleth',
        data=gdf2.reset_index(), 
        columns=['gcc','happiness_score'],
        key_on='properties.GCC_CODE21', 
        fill_color='Paired', 
        nan_fill_color='black',
        legend_name='happiness_score per gcc',
    )
    c.add_to(m)

    m.save('../data/curated/gcc_map.html')
    

    # -----------------------------------------------------
    view_result = db.view('_design/agg/_view/sal-score-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    keys = [row['key'] for row in result]
    ave = [row['value']['avg'] for row in result]
    gdf = gpd.read_file("../data/curated/SAL_2021_AUST_GDA2020_SHP/SAL_2021_AUST_GDA2020.shp")
    geoJSON = gpd.read_file("../data/curated/sal_geojson.geojson")
    df = pd.DataFrame({"sal":keys, "happiness_score":ave})
    df['sal'] = df['sal'].str.upper()
    gdf2 = pd.merge(gdf, df, how='left', left_on='SAL_CODE21', right_on = 'sal')
    m2 = folium.Map(location=[-25.2744, 133.7751], tiles="cartodbpositron", zoom_start=4, color='white')
    svg_style = '<style>svg {background-color: rgb(255, 255, 255,0.5);}</style>'
    m2.get_root().header.add_child(folium.Element(svg_style))
    c = folium.Choropleth(
        geo_data=geoJSON,
        name='choropleth',
        data=gdf2.reset_index(), 
        columns=['sal','happiness_score'],
        key_on='properties.SAL_CODE21', 
        line_opacity=0,
        fill_color='Paired', 
        nan_fill_color='white',
        legend_name='happiness_score per sal',
    )
    c.add_to(m2)
    # -------------------------state-------------------------------------

    view_result = db.view('_design/agg/_view/state-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    ave = [row['value']['avg'] for row in result]
    keys = ['NSW', 'VIC', 'QLD', 'SA', 'WA','TAS', 'NT', 'ACT']
    ave_color = ['#f4a582' if a >= 5.91526 else '#fddbc7' for a in ave]
    fig = go.Figure([go.Bar(x=keys, y=ave,marker_color=ave_color)])
    fig.update_layout(yaxis_range=[5.6, 6.1],
        xaxis_title='States',
        yaxis_title='Happiness Score',
        yaxis_showgrid=True,
        yaxis_gridcolor='lightgrey',
        plot_bgcolor='white')
    fig.add_hline(y=5.91526, line_dash="dot",
                annotation_text="AU baseline (5.91526)", 
                annotation_position="bottom right")    
    chart_data2 = json.dumps(fig, cls=PlotlyJSONEncoder)

    #state_locations = {'nsw': (-32.0, 146.0), 'vic': (-37.0, 145.0), 'qld': (-20.0, 143.0), 'sa': (-30.0, 135.0), 'wa': (-27.0, 121.0), 'tas': (-42.0, 146.0), 'nt': (-20.0, 133.0), 'act': (-35.0, 149.0)}
    #averages_by_state = {'nsw': 5.939376343261581, 'vic': 5.900216282200858, 'qld': 5.894326677380478, 'sa': 5.924167045178846, 'wa': 5.889941445951669, 'tas': 5.954870757559762, 'nt': 5.929317511101778, 'act': 5.936749708020824}
    return render_template('s2.html', result = result, chart_data=chart_data, chart_data2=chart_data2, map=m._repr_html_(), map2=m2._repr_html_())

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

#---------------------------s4--------------------------
@app.route('/s4/')
def s4():
    return render_template('s4.html')


if __name__ == '__main__':
    app.run(debug=True)
'''if __name__=="__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'), 
            port=int(os.getenv('PORT', 4444)))'''