from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__) # create the application instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mydb.db' 
app.config['SQLALCHEMY_POOL_RECYCLE'] = 15
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['SERVER_NAME'] = 'ontherun.me:5000'
CORS(app)
db = SQLAlchemy(app)

print("DB connection established...")

class State(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    population = db.Column(db.Integer)
    abbreviation = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(600))
    name = db.Column(db.String(600))
    density = db.Column(db.Float)
    area = db.Column(db.Integer)
    capital = db.Column(db.String(600))
    region = db.Column(db.String(600))
    flower = db.Column(db.String(600))
    bird = db.Column(db.String(600))
    type = db.Column(db.String(600))
    wiki= db.Column(db.String(600))
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

    def __repr__(self):
        return "{'center': \{'lat': %r, 'lng': %r \}'wiki': %r, 'type': %r, 'flower': %r, 'bird': %r, 'region': %r, 'density': %r, 'area': %r, 'capital': %r, 'name': %r, 'image': %r, 'abbreviation': %r, 'population': %r, 'id': %r}" % (self.lat, self.lng, self.wiki, self.type, self.flower, self.bird, self.region, self.density, self.area, self.capital, self.name, self.image, self.abbreviation, self.population, self.id)

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
    state = db.Column(db.String(600))
    type = db.Column(db.String(600))
    fbi = db.Column(db.String(600))

    def __repr__(self):
        return "{'fbi': %r, 'type': %r, 'state': %r, 'image': %r, 'id': %r, 'name': %r, 'field_office': %r, 'height': %r, 'weight': %r, 'sex': %r, 'hair': %r, 'eyes': %r, 'dob': %r, 'race': %r, 'nationality': %r, 'crime': %r}" % (self.fbi, self.type, self.state, self.image, self.id, self.name, self.field_office, self.height, self.weight, self.sex, self.hair, self.eyes, self.dob, self.race, self.nationality, self.crime)

class Crime(db.Model):
    __tablename__ = 'crimes'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(600))
    description = db.Column(db.String(6000))
    offenders = db.Column(db.Integer)
    victims = db.Column(db.Integer)
    count = db.Column(db.Integer)
    type = db.Column(db.String(600))

    def __repr__(self):
        return "{'type': %r, 'offenders': %r,'victims': %r,'count': %r,'image': %r, 'id': %r, 'name': %r, 'description': %r, 'info': 'https://ucr.fbi.gov/crime-in-the-u.s/2016/crime-in-the-u.s.-2016/topic-pages/tables/table-3'}" % (self.type, self.offenders, self.victims, self.count, self.image, self.id, self.name, self.description)

class CrimesState(db.Model):
    __tablename__ = 'crimesTostate'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    state_id = db.Column(db.Integer)
    state_abbreviation = db.Column(db.String(10))
    state_name = db.Column(db.String(600))
    crime_id = db.Column(db.Integer)
    crime_name = db.Column(db.String(600))

    def __repr__(self):
        return "{'state_name': %r, 'state_abbreviation': %r, 'id': %r, 'state_id': %r, 'crime_id': %r, 'crime_name': %r}" % (self.state_name, self.state_abbreviation, self.id, self.state_id, self.crime_id, self.crime_name)

class CrimesCriminal(db.Model):
    __tablename__='crimeTocriminal'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    crime_id = db.Column(db.Integer)
    criminal_id = db.Column(db.Integer)
    crime_name = db.Column(db.String(600))
    criminal_name = db.Column(db.String(600))

    def __repr__(self):
        return "{'crime_name': %r, 'criminal_name': %r, 'crime_id': %r, 'id': %r, 'criminal_id': %r}" % (self.crime_name, self.criminal_name, self.crime_id, self.id, self.criminal_id)

class CriminalState(db.Model):
    __tablename__='criminalTostate'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    state_id = db.Column(db.Integer)
    criminal_id = db.Column(db.Integer)
    state_name = db.Column(db.String(600))
    criminal_name = db.Column(db.String(600))

    def __repr__(self):
        return "{'state_name': %r, 'criminal_name': %r, 'state_id': %r, 'id': %r, 'criminal_id': %r}" % (self.state_name, self.criminal_name, self.state_id, self.id, self.criminal_id)