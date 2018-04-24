import os
import json
import errno
import sys
import filecmp
import re
import requests

URL = "http://api.canitstreamto.me/v1/country"
PG_SZ = "?pagesize=250"
ITEMS = ["streams", "movies"]

def write_data(result,outfile):
    success = False
    country_name = result.name
    country_id = result.id
    outfile.write("{country: "+country_name+", id: "+str(country_id)+"},")
    success = True
    return success

def scrape_data(state=None):
    
    print("Getting data...")
    url = URL+PG_SZ
    response = requests.get(url)
        
    if response.status_code == 404:
        print("404 ERROR !!!!")
        
    data = json.loads(response.content)
    result = data
    # result = {"data": [{"name": "Afghanistan", "id": 1},{"name": "USA", "id": 2}]}

    with open("countryData.txt", "w") as outfile:
		outfile.write("{data: [")
		for item in result.data:
			write_data(item,outfile)
		outfile.write("]}")

        
if __name__ == "__main__":
    
    scrape_data()
    print("Done.\n")