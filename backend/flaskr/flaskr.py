import os
import sqlite3
from flask import Flask, jsonify, request, session, g, redirect, url_for, abort, \
     render_template, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import select
import ast
import json
import unicodedata

app = Flask(__name__) # create the application instance :)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mydb.db' # load config from this file , flaskr.py
#app.config['SERVER_NAME'] = 'ontherun.me:5000'
CORS(app)
db = SQLAlchemy(app)

statelist = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "DC", "WV", "WI", "WY"]
statenames = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachussetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Washington DC", "West Virginia", "Wisconsin", "Wyoming"]

class State(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    population = db.Column(db.Integer)
    abbreviation = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(600))
    name = db.Column(db.String(600))

    def __repr__(self):
        return "{'name': %r, 'image': %r, 'abbreviation': %r, 'population': %r}" % (self.name, self.image, self.abbreviation, self.population)

class Criminal(db.Model):
    __tablename__ = 'criminals'
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
    __tablename__ = 'crimes'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(600))
    description = db.Column(db.String(6000))

    def __repr__(self):
        return "{'image': %r, 'id': %r, 'name': %r, 'description': %r}" % (self.image, self.id, self.name, self.description)

class CrimesState(db.Model):
    __tablename__ = 'crimesTostate'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    state_id = db.Column(db.Integer)
    crime_id = db.Column(db.Integer)

    def __repr__(self):
        return "{'id': %r, 'state_id': %r, 'crime_id': %r}" % (self.id, self.state_id, self.crime_id)


@app.route('/states', methods=['GET'])#, subdomain="api")
def get_states():
    limit = request.args.get('limit','')
    if limit == '':
        limit = 289
    offset = request.args.get('offset','')
    if offset == '':
        offset = 0
    offset = int(offset)*int(limit)
    return jsonify({'totalCount': db.session.query(State).count(), 'states': ast.literal_eval(str(State.query.filter(State.id>offset).limit(limit).all()))})

@app.route('/states/<string:state_name>', methods=['GET'])#, subdomain="api")
def get_state(state_name):
    if len(state_name) == 2:
        return jsonify(ast.literal_eval(str(State.query.filter_by(abbreviation=state_name).first())))
    else:    
        return jsonify(ast.literal_eval(str(Crime.query.filter_by(name=state_name).first())))

@app.route('/criminals', methods=['GET'])#, subdomain="api")
def get_criminals():
    limit = request.args.get('limit','')
    if limit == '':
        limit = 289
    offset = request.args.get('offset','')
    if offset == '':
        offset = 0
    offset = int(offset)*int(limit)
    return jsonify({'totalCount': db.session.query(Criminal).count(), 'criminals': ast.literal_eval(str(Criminal.query.filter(Criminal.id>offset).limit(limit).all()))})

@app.route('/criminals/<int:crim_id>', methods=['GET'])#, subdomain="api")
def get_criminal(crim_id):
    return jsonify(ast.literal_eval(str(Criminal.query.filter_by(id=crim_id).first())))

@app.route('/crimes', methods=['GET'])#, subdomain="api")
def get_crimes():
    limit = request.args.get('limit','')
    if limit == '':
        limit = 289
    offset = request.args.get('offset','')
    if offset == '':
        offset = 0
    offset = int(offset)*int(limit)
    return jsonify({'totalCount': db.session.query(Crime).count(), 'crimes': ast.literal_eval(str(Crime.query.filter(Crime.id>offset).limit(limit).all()))})

@app.route('/crimes/<int:crim_id>', methods=['GET'])#, subdomain="api")
def get_crime(crim_id):
    return jsonify(ast.literal_eval(str(Crime.query.filter_by(id=crim_id).first())))

@app.route('/crimestostate', methods=['GET'])#, subdomain="api")
def get_crimetostate():
    return jsonify(ast.literal_eval(str(CrimesState.query.all())))

# /api/states/                          //done
# /api/states/<abr>
# /api/states/info
# /api/states/crimes                    
# /api/states/crimes/<id>               
# /api/states/criminals                 
# /api/states/criminals/<id>            
# /api/criminals/                       //done
# /api/criminals/info
# /api/criminals/<id>                   //done
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
        i = 1;
        while line:
            strLine = str(line).split(":") 
            NewImage = "https://raw.githubusercontent.com/roshan-dongre/idb/master/crimephotos/"+str(i)+".jpg"
            i += 1
            NewDesc = strLine[2]
            if(isinstance(NewDesc,str)):
            	NewDesc = unicode(NewDesc, "utf-8")
            NewCrime = Crime(name=strLine[1],
                            image=NewImage,
                            description=NewDesc)
            db.session.add(NewCrime)
            line = fp.readline()

    with open('../crime_data/population.txt') as fp:
        line = fp.readline()
        i = 0
        while line:
            strLine = str(line).split(" ") 
            NewImage = "https://raw.githubusercontent.com/roshan-dongre/idb/master/stateflags/"+statelist[i]+".png"
            NewName = statenames[i]
            i += 1
            NewState = State(population=strLine[1],
                            abbreviation=strLine[0],
                            image= NewImage,
                            name= NewName)
            db.session.add(NewState)
            line = fp.readline()
    for abv in statelist:
        with open('../crime_data/json/'+abv) as fp:
            data = json.loads(fp.readline())
            for x in data:
                if x['count'] != None:
                    if x['count'] > 0:
                        print("Found "+str(x['state_id'])+ ", "+ str(x['crime_id']))
                        NewStateId = x['state_id']
                        NewCrimeId = x['crime_id']
                        NewCrimeState = CrimesState(state_id=NewStateId,
                                                    crime_id=NewCrimeId)
                        db.session.add(NewCrimeState)

    db.session.commit()
    print("Created db\n\n\n")
    app.run(host='0.0.0.0', port=5000)
