# import the Flask class from the flask module
from flask import Flask, render_template
import requests
import json

# create the application object
app = Flask(__name__)

Krishna = 0
Ramon = 1
Zara = 2
Roshan = 3
Ricardo = 4

def iton(GitId):
	if(GitId=='rp27537'):
		return Ramon
	if(GitId=='zaralouis'):
		return Zara
	if(GitId=='roshan-dongre'):
		return Roshan
	if(GitId=='larius11'):
		return Ricardo
	return 0;

# use decorators to link the function to a url
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
	total_commits = 0
	total_issues = 0

	num_commits = [0, 0, 0, 0, 0]
	num_issues = [0, 0, 0, 0, 0]
	
	r = requests.get('https://api.github.com/repos/roshan-dongre/idb/stats/contributors')
	data=json.loads(r.content)

	for item in data:
		num_commits[iton(item['author']['login'])] = item['total']
		total_commits += num_commits[iton(item['author']['login'])]

	r_two = requests.get('https://api.github.com/repos/roshan-dongre/idb/issues?&state=all')
	data_issues = json.loads(r_two.content)

	for item in data_issues:
		num_issues[iton(item['user']['login'])] += 1
		total_issues += 1

	return render_template('about.html',tot_issues=total_issues,tot_commits=total_commits,ram_commits=num_commits[Ramon],ram_issues=num_issues[Ramon],ros_commits=num_commits[Roshan],ros_issues=num_issues[Roshan],zar_commits=num_commits[Zara],zar_issues=num_issues[Zara],kri_commits=num_commits[Krishna],kri_issues=num_issues[Krishna],ric_commits=num_commits[Ricardo],ric_issues=num_issues[Ricardo])

@app.route('/crime')
def crime():
    return render_template('crime.html')

@app.route('/criminal')
def criminal():
    return render_template('criminal.html')

@app.route('/state')
def state():
    return render_template('state.html')

@app.route('/arson')
def crime1():
    return render_template('crime1.html')

@app.route('/kidnapping')
def crime2():
    return render_template('crime2.html')

@app.route('/child')
def crime3():
    return render_template('crime3.html')

@app.route('/joseph')
def criminal1():
    return render_template('criminal1.html')

@app.route('/hilal')
def criminal2():
    return render_template('criminal2.html')

@app.route('/luis')
def criminal3():
    return render_template('criminal3.html')

@app.route('/washington')
def state1():
    return render_template('state1.html')

@app.route('/ohio')
def state2():
    return render_template('state2.html')

@app.route('/maryland')
def state3():
    return render_template('state3.html')

# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
