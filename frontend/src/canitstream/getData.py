import os
import json
import errno
import sys
import filecmp
import re
import requests

URL = "http://api.canitstreamto.me/v1/country"
PG_SZ = "?pagesize=250"
ITEMS = ["streaming", "movie"]

def write_data(result,outfile):
    success = False
    country_name = result["name"].encode('ascii', 'ignore')
    country_id = result["id"]
    country_streams = [{} for i in range(5)]
    country_movies = [{} for i in range(5)]

    url = URL+"/"+str(country_id)+"/streaming"
    response = requests.get(url)
    data = json.loads(response.content)
    i = 0
    for instance in data["data"]:
    	if i == 5:
    		break
    	country_streams[i] = "{\"name\": \""+instance["name"]+"\"}"
    	i += 1
    mystream = ""
    first = 1
    for stream in country_streams:
    	if len(stream)>0:
    		if first == 1:
    			first = 0
    		else:
    			mystream+=","
    		mystream += stream

    url = URL+"/"+str(country_id)+"/movie"
    response = requests.get(url)
    data = json.loads(response.content)
    i = 0
    for instance in data["data"]:
    	if i == 5:
    		break
    	country_movies[i] = "{\"name\": \""+instance["name"]+"\"}"
    	i += 1
    mymovie = ""
    first = 1 
    for stream in country_movies:
    	if len(stream)>0:
    		if first == 1:
    			first = 0
    		else:
    			mymovie+=","
    		mymovie += stream.encode('ascii', 'ignore')
    outfile.write("{\"country\": \""+country_name+"\", \"streams\": ["+mystream+"], \"movies\": ["+mymovie+"]},")
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
		outfile.write("{\"data\": [")
		for item in result["data"]:
			write_data(item,outfile)
		outfile.write("]}")

        
if __name__ == "__main__":
    
    scrape_data()
    print("Done.\n")