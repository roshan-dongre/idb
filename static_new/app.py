# import the Flask class from the flask module
from flask import Flask, render_template
import requests
import json

# create the application object
app = Flask(__name__)

# use decorators to link the function to a url
@app.route('/')
def index():
    return render_template('index.html')  

@app.route('/about')
def about():
	r = requests.get('https://api.github.com/repos/roshan-dongre/idb/stats/contributors')
	data=json.loads(r.content)
	return render_template('about.html',firstuser=data[1]['author']['login'])

@app.route('/crime')
def crime():
    return render_template('crime.html') 

@app.route('/criminal')
def criminal():
    return render_template('criminal.html')

@app.route('/state')
def state():
    return render_template('state.html') 

@app.route('/crime1')
def crime1():
    return render_template('crime1.html')

@app.route('/criminal1')
def criminal1():
    return render_template('criminal1.html')

@app.route('/state1')
def state1():
    return render_template('state1.html')    

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True, port=80)