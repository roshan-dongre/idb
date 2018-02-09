import requests
import json

if __name__ == '__main__':
  
  #Sample FBI request
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
  