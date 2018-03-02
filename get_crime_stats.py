# -------
# imports
# -------

import sys
import requests
import json
import os
import errno
import filecmp
import re


URL1 = "https://api.usa.gov/crime/fbi/ucr/"
URL3 = "/offense_name?page=1&per_page=100&output=json&year=2016&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
DIR_CRIME = "crime_data"
ITEMS = ["offenses", "offenders", "victims"]

def write_crime(result, filename):
    print("Writing to " + filename + "...")
    success = False
    if not os.path.exists(os.path.dirname(filename)):
        try:
            os.makedirs(os.path.dirname(filename))
        except OSError, exc:
            # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise

    with open(filename, "w") as outfile:
        json.dump(result, outfile)
        success = True
            
    return success

def scrape_crime(state=None):
    
    location = "national"
    if(state != None):
        location = "states/" + state
    
    print("Getting " + location + " data...")
    
    for item in ITEMS:
        url2 = item + "/count/" + location
        url = URL1 + url2 + URL3
        response = requests.get(url)
        
        if response.status_code == 404:
            print("404 ERROR !!!!")
            break
        
        data = json.loads(response.content)
        result = data['results']
        filename = DIR_CRIME + "/" + location + "/" + item
        write_crime(result, filename)

        
if __name__ == "__main__":
    
    scrape_crime()
    
    statelist = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
    "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "DC", "WV", "WI", "WY"]
    
    for state in statelist:
        scrape_crime(state)

    print("Done.\n")
