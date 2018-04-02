import requests
import json
from flask import Flask
from flask_cors import CORS
import collections
import unittest
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
db = SQLAlchemy(app)

class State(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    population = db.Column(db.Integer)
    abbreviation = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(600))
    name = db.Column(db.String(600))

    def asDict(self):
    	return {"name": self.name, "id": self.id, "population": self.population, "abbreviation": self.abbreviation, "image": self.image}

    def __repr__(self):
        return "{'name': %r, 'image': %r, 'abbreviation': %r, 'population': %r, 'id': %r}" % (self.name, self.image, self.abbreviation, self.population, self.id)

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

    def asDict(self):
    	return {
    		"id": self.id,
    		"name": self.name,
    		"field_office": self.field_office,
    		"height": self.height,
    		"weight": self.weight,
    		"sex": self.sex,
    		"hair": self.hair,
    		"eyes": self.eyes,
    		"dob": self.dob,
    		"race": self.race,
    		"nationality": self.nationality,
    		"crime": self.crime,
    		"image": self.image,
    		"state": self.state
    	}

    def __repr__(self):
        return "{'state': %r, 'image': %r, 'id': %r, 'name': %r, 'field_office': %r, 'height': %r, 'weight': %r, 'sex': %r, 'hair': %r, 'eyes': %r, 'dob': %r, 'race': %r, 'nationality': %r, 'crime': %r}" % (self.state, self.image, self.id, self.name, self.field_office, self.height, self.weight, self.sex, self.hair, self.eyes, self.dob, self.race, self.nationality, self.crime)

class Crime(db.Model):
    __tablename__ = 'crimes'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(600))
    description = db.Column(db.String(6000))

    def asDict(self):
    	return {"id": self.id, "name": self.name, "image": self.image, "description": self.description}

    def __repr__(self):
        return "{'image': %r, 'id': %r, 'name': %r, 'description': %r}" % (self.image, self.id, self.name, self.description)

class CrimesState(db.Model):
    __tablename__ = 'crimesTostate'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    state_id = db.Column(db.Integer)
    state_abbreviation = db.Column(db.String(10))
    state_name = db.Column(db.String(600))
    crime_id = db.Column(db.Integer)
    crime_name = db.Column(db.String(600))

    def asDict(self):
    	return {"id": self.id, "state_id": self.state_id, "state_abbreviation": self.state_abbreviation, "state_name": self.state_name, "crime_id": self.crime_id, "crime_name": self.crime_name}

    def __repr__(self):
        return "{'state_name': %r, 'state_abbreviation': %r, 'id': %r, 'state_id': %r, 'crime_id': %r, 'crime_name': %r}" % (self.state_name, self.state_abbreviation, self.id, self.state_id, self.crime_id, self.crime_name)

class CrimesCriminal(db.Model):
    __tablename__='crimeTocriminal'
    id = db.Column(db.Integer,primary_key=True,unique=True)
    crime_id = db.Column(db.Integer)
    criminal_id = db.Column(db.Integer)

    def asDict(self):
    	return {"id": self.id, "crime_id": self.crime_id, "criminal_id": self.criminal_id}

    def __repr__(self):
        return "{'crime_id': %r, 'id': %r, 'criminal_id': %r}" % (self.crime_id, self.id, self.criminal_id)



class DBTest(unittest.TestCase):

	def test_state(self):
		db.create_all()
		State.query.filter(State.id == 78).delete()
		db.session.commit()
		state = State(id = 78, population = 5, abbreviation = "GG", image = "what", name = "Goggg")
		db.session.add(state)
		db.session.commit()

		whatWeWant = {"name": "Goggg", "image": "what", "abbreviation": "GG", "population": 5, "id": 78}
		placeholder = State.query.filter(State.id == 78).first()
		self.assertEqual(whatWeWant, placeholder.asDict())

		State.query.filter(State.id == 78).delete()
		db.session.commit()
		pass

	def test_criminal(self):
		db.create_all()
		Criminal.query.filter(Criminal.id == 978).delete()
		db.session.commit()

		crim = Criminal(id = 978, image = "what", name = "Goggg", field_office = "miami", height = 4, weight = 5, sex = "m", hair = "black", eyes = "brown", dob = "4", race = "what", nationality = "seventy", crime = "crime", state = "state")
		db.session.add(crim)
		db.session.commit()

		whatWeWant = crim.asDict()
		placeholder = Criminal.query.filter(Criminal.id == 978).first()
		self.assertEqual(whatWeWant, placeholder.asDict())

		Criminal.query.filter(Criminal.id == 978).delete()
		db.session.commit()
		pass

	def test_crime(self):
		db.create_all()
		Crime.query.filter(Crime.id == 1000).delete()
		db.session.commit()
		crime = Crime(id = 1000, name = "Robbery2", image = "robbery2.txt.img", description = "whatwhat")
		db.session.add(crime)
		db.session.commit()

		whatWeWant = crime.asDict()
		placeholder = Crime.query.filter(Crime.id == 1000).first()
		self.assertEqual(whatWeWant, placeholder.asDict())

		Crime.query.filter(Crime.id == 1000).delete()
		db.session.commit()
		pass

	def test_crimesstate(self):
		db.create_all()
		CrimesState.query.filter(CrimesState.id == 1000).delete()
		db.session.commit()
		cs = CrimesState(id = 1000, crime_name = "Robbery2", state_name = "robbery2.txt.img", state_abbreviation = "gg", state_id = 2, crime_id = 5)
		db.session.add(cs)
		db.session.commit()

		whatWeWant = cs.asDict()
		placeholder = CrimesState.query.filter(CrimesState.id == 1000).first()
		self.assertEqual(whatWeWant, placeholder.asDict())

		CrimesState.query.filter(CrimesState.id == 1000).delete()
		db.session.commit()
		pass

	def test_crimescriminal(self):
		db.create_all()
		CrimesCriminal.query.filter(CrimesCriminal.id == 1000).delete()
		db.session.commit()
		cs = CrimesCriminal(id = 1000, crime_id = 8, criminal_id = 5)
		db.session.add(cs)
		db.session.commit()

		whatWeWant = cs.asDict()
		placeholder = CrimesCriminal.query.filter(CrimesCriminal.id == 1000).first()
		self.assertEqual(whatWeWant, placeholder.asDict())

		CrimesCriminal.query.filter(CrimesCriminal.id == 1000).delete()
		db.session.commit()
		pass

class StateTest(unittest.TestCase):
  
  def setUp(self):
    self.url = "http://api.ontherun.me:5000/states"

  def test_1(self):
    response = requests.get(self.url)
    data = json.loads(response.content)
    keys1 = ["abbreviation", "id", "image", "name", "population"]
    keys2 = data["states"][0].keys()
    for k in keys1:
      self.assertIn(k, keys2)
    
  def test_2(self):
    response = requests.get(self.url)
    data = json.loads(response.content)
    self.assertEqual(len(data["states"]), 51)
    
  def test_3(self):
    response = requests.get(self.url + "/TX")
    data = json.loads(response.content)
    self.assertEqual(data["id"], 43)
    
  def test_4(self):
    response = requests.get(self.url + "/5")
    data = json.loads(response.content)
    self.assertEqual(data["abbreviation"], "CA")
    
class CriminalTest(unittest.TestCase):
  
  def setUp(self):
    self.url = "http://api.ontherun.me:5000/criminals"
    
  def test_1(self):
    response = requests.get(self.url)
    data = json.loads(response.content)
    keys1 = ["crime", "dob", "eyes", "field_office", "hair", "height", "id",
      "image", "name", "nationality", "race", "sex", "state", "weight"]
    keys2 = data["criminals"][0].keys()
    for k in keys1:
      self.assertIn(k, keys2)
      
  # def test_2(self):
  #   response = requests.get(self.url + "/64")
  #   data = json.loads(response.content)
  #   self.assertEqual(data["name"], "WEI LI PANG")
    
class CrimeTest(unittest.TestCase):

  def setUp(self):
    self.url = "http://api.ontherun.me:5000/crimes"
    
  def test_1(self):
    response = requests.get(self.url)
    data = json.loads(response.content)
    keys1 = ["description", "id", "image", "name"]
    keys2 = data["crimes"][0].keys()
    for k in keys1:
      self.assertIn(k, keys2)
      
  # def test_2(self):
  #   response = requests.get(self.url)
  #   data = json.loads(response.content)
  #   self.assertEqual(len(data["crimes"]), 52)
  
  def test_3(self):
    response = requests.get(self.url + "/40")
    data = json.loads(response.content)
    self.assertEqual(data["name"], "Shoplifting")
    
class CrimesToState(unittest.TestCase):
  
  def setUp(self):
    self.url = "http://api.ontherun.me:5000/crimestostate"
    
  def test_1(self):
    response = requests.get(self.url)
    data = json.loads(response.content)
    keys1 = ["crime_id", "crime_name", "id", "state_abbreviation", "state_id"]
    keys2 = data[0].keys()
    for k in keys1:
      self.assertIn(k, keys2)

  def test_2(self):
    response = requests.get(self.url + "/4")
    data = json.loads(response.content)
    for x in data:
      self.assertEqual(x["crime_name"], "Arson")
      
class CriminalsToState(unittest.TestCase):
  
  def setUp(self):
    self.url = "http://api.ontherun.me:5000/criminalstostate"
    
  def test_1(self):
    response = requests.get(self.url)
    data = json.loads(response.content)
    keys1 = ["id", "state"]
    keys2 = data[0].keys()
    for k in keys1:
      self.assertIn(k, keys2)
    
    
if __name__ == '__main__':
  
  unittest.main()
  print("Done.")


