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
from couchdb import Server
server = Server()
db = server.create('muocouch')


#Create an app object using the Flask class. 
app = Flask(__name__)


#Load the trained model. (Pickle file)

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)
print(dname)



@app.route('/')
def home():
    return render_template('index2.html')

@app.route('/', methods=['GET'])
def register():
    server = Server()
    user = {
        "username":"media site"}
    db = server['muocouch']
    map_func = '''function(doc) 
    { emit(doc.doc_rev, doc); }'''
    myQuery = User.query(db, map_func, reduce_fun=None, reverse=True)
    q = [i['username'] for i in myQuery] 
    print(q)
    return "<h2>Your data is now in the database</h2>"

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