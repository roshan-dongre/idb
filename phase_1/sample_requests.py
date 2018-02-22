import requests
import json

if __name__ == '__main__':
  
  #Sample FBI Wanted request
  response = requests.get('https://api.fbi.gov/wanted/v1/list')
  data = json.loads(response.content)
  
  print(data['total'])
  x = len(data['items'])
  print(x)
  for i in range(x):
    print(data['items'][i]['title'])
    print(data['items'][i]['description'])

  print("")
  
  #Sample World Bank Request
  response = requests.get("http://api.worldbank.org/v2/countries?per_page=255&incomeLevel=LIC&format=json")
  data = json.loads(response.content)
  for country in data[1]:
    print(country['name'])
  
  print("")
  
  #Sample FBI Data request
  response = requests.get("https://api.usa.gov/crime/fbi/ucr/estimates/national?page=1&per_page=128&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  data = json.loads(response.content)
  result = data['results']
  for entry in result:
    print(str(entry['year']) + ", " + str(entry['homicide']) + " homicides")
  print("")
  
  