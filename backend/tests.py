import requests
import json
import unittest

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
      
  def test_2(self):
    response = requests.get(self.url + "/64")
    data = json.loads(response.content)
    self.assertEqual(data["name"], "SHU GANG LI")
    
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
      
  def test_2(self):
    response = requests.get(self.url)
    data = json.loads(response.content)
    self.assertEqual(len(data["crimes"]), 52)
  
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


