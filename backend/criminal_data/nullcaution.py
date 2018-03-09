import requests
import json

if __name__ == '__main__':
  
  page = 1
  count = 0
  
  while page <= 35:
    url = "https://api.fbi.gov/wanted/v1/list?page=" + str(page)
    response = requests.get(url)
    data = json.loads(response.content)
    items = data['items']
    
    for i in items:  
      if i['caution'] != None:
        if i['title'] != None:
          if not "UNKNOWN" in i['title']:
            count += 1
            print(i)
    page += 1
  print(count)
