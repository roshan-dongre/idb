import os
import sqlite3
from flask import Flask, jsonify, request, session, g, redirect, url_for, abort, \
     render_template, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import ast
import json

app = Flask(__name__) # create the application instance :)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mydb.db' # load config from this file , flaskr.py
# app.config['SERVER_NAME'] = 'ontherun.me:5000'
CORS(app)
db = SQLAlchemy(app)

class State(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True)
    population = db.Column(db.Integer)
    abbreviation = db.Column(db.String(10), nullable=False)
    picture = db.Column(db.String(150))
    def __repr__(self):
        return "{'abbreviation': %r, 'population': %r}" % (self.abbreviation, self.population)

class Criminal(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True)
    name = db.Column(db.String(80), nullable=False)
    field_office = db.Column(db.String(80), nullable=False)
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    sex = db.Column(db.String(80))
    hair = db.Column(db.String(80))
    eyes = db.Column(db.String(80))
    dob = db.Column(db.String(80))
    race = db.Column(db.String(80))
    nationality = db.Column(db.String(80))
    crime = db.Column(db.String(600), nullable=False)
    image = db.Column(db.String(600))
    def __repr__(self):
        return "{'image': %r, 'id': %r, 'name': %r, 'field_office': %r, 'height': %r, 'weight': %r, 'sex': %r, 'hair': %r, 'eyes': %r, 'dob': %r, 'race': %r, 'nationality': %r, 'crime': %r}" % (self.image, self.id, self.name, self.field_office, self.height, self.weight, self.sex, self.hair, self.eyes, self.dob, self.race, self.nationality, self.crime)


class Crime(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True)
    name = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return "{'id': %r, 'name': %r}" % (self.id, self.name)

@app.route('/states', methods=['GET'], subdomain="api")
def get_states():
    return jsonify({'states': ast.literal_eval(str(State.query.all()))})

@app.route('/criminals', methods=['GET'], subdomain="api")
def get_criminals():
    return jsonify({'criminals': ast.literal_eval(str(Criminal.query.all()))})

@app.route('/crimes', methods=['GET'], subdomain="api")
def get_crimes():
    return jsonify({'total_pages': '1', 'crimes': ast.literal_eval(str(Crime.query.all()))})

@app.route('/', methods=['GET'], subdomain="api")
def get_info():
    return redirect("https://roshan-dongre.gitbooks.io/api/")

# /api/states/                          //done
# /api/states/<abr>
# /api/states/info
# /api/states/crimes
# /api/states/crimes/<abr>
# /api/states/criminals
# /api/states/criminals/<abr>
# /api/criminals/                       //done
# /api/criminals/info
# /api/criminals/<id>
# /api/crimes/                          //done
# /api/crimes/info
# /api/crimes/criminals
# /api/crimes/criminals/<crime_id>

#404 handling for api 
@app.errorhandler(404)
def pageNotFound(error):
    return redirect("https://roshan-dongre.gitbooks.io/api/")


# start the server with the 'run()' method
if __name__ == '__main__':
#    initdb_command()
    db.reflect()
    db.drop_all()
    db.create_all()

    data = json.load(open('../criminal_data/sus.txt'))
    
    for person in data:
        NewName = person["title"]
        NewFieldOffice = person["field_offices"]
        if NewFieldOffice == None:
            NewFieldOffice = ["None"]
        NewHeight = person["height_min"]
        NewWeight = person["weight_min"]
        NewSex = person["sex"]
        NewHair = person["hair"]
        NewEyes = person["eyes"]
        NewDob = person["dates_of_birth_used"]
        if NewDob == None:
            NewDob = ["None"]
        NewRace = person["race_raw"]
        NewNationality = person["nationality"]
        NewCrime = person["caution"]
        NewImage = person["images"]
        NewCriminal = Criminal(name=NewName,
                              field_office=NewFieldOffice[0],
                              height=NewHeight,
                              weight=NewWeight,
                              sex=NewSex,
                              hair=NewHair,
                              eyes=NewEyes,
                              dob=NewDob[0],
                              race=NewRace,
                              nationality=NewNationality,
                              crime=NewCrime,
                              image=NewImage[0]["large"])
        db.session.add(NewCriminal)

    with open('../crime_data/crime_ids.txt') as fp:
        line = fp.readline()
        while line:
            strLine = str(line).split(":")
            NewCrime = Crime(name=strLine[1]) 
            db.session.add(NewCrime)
            line = fp.readline()

    with open('../crime_data/population.txt') as fp:
        line = fp.readline()
        while line:
            strLine = str(line).split(" ")
            NewState = State(population=strLine[1],
                            abbreviation=strLine[0])
            db.session.add(NewState)
            line = fp.readline()

    db.session.commit()
    print("Created db\n\n\n")
    app.run(host='0.0.0.0', port=5000)
