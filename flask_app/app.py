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
import geopandas as gpd
from flask_caching import Cache
from flask_cors import CORS




#Create an app object using the Flask class. 
app = Flask(__name__)
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

#Load the trained model. (Pickle file)

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)
print(dname)

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
def first_test():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/gcc-score-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)

@app.route('/gccWeekend')
def gccWeekend():
    couch = couchdb.Server('http://admin:admin@172.26.131.83:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/dow-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    # print(result)
    return jsonify(result)

@app.route('/gccMonth')
def gccMonth():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/month-agg-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)

@app.route('/gccCount')
def gccCount():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/state-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    return jsonify(result)


@app.route('/gccCount2')
def gccCount_2():
    couch = couchdb.Server('http://admin:admin@localhost:5984')
    db = couch['twitter']
    view_result = db.view('_design/agg/_view/gcc-score-view', reduce=True, group=True)
    result = [{'key': row.key, 'value': row.value} for row in view_result]
    print(result)
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


    # Convert figure to JSON-serializable format
    # chart_data = json.dumps(fig, cls=PlotlyJSONEncoder)
    # Render the template with the result
    # def calculate_state_averages(json_data):
    #     state_totals = {}
    #     state_counts = {}
    #     for row in json_data['rows']:
    #         state_key = row['key'][0]
    #         if state_key not in state_totals:
    #             state_totals[state_key] = 0
    #             state_counts[state_key] = 0
    #         state_totals[state_key] += row['value']['total']
    #         state_counts[state_key] += row['value']['count']
    #     state_averages = {}
    #     for state_key in state_totals:
    #         state_averages[state_key] = state_totals[state_key] / state_counts[state_key]
    #     return state_averages
    # state_averages = calculate_state_averages(view_result)
    # state_map = {'1': 'nsw', '2': 'vic', '3': 'qld', '4': 'sa', '5': 'wa', '6': 'tas', '7': 'nt', '8': 'act'}
    # averages_by_state = {state_map[key]: value for key, value in state_averages.items()}
    
    
    #gdf = gpd.read_file("../data/raw/GCCSA_2021_AUST_SHP_GDA2020/GCCSA_2021_AUST_GDA2020.shp")
    # Simplify the geometry column
    #gdf.geometry = gdf.geometry.simplify(tolerance=0.01, preserve_topology=True)
    # Save the simplified GeoDataFrame to a new file

    #gdf.to_file("../data/processed/simplified_GCCSA_2021_AUST_GDA2020.shp")
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