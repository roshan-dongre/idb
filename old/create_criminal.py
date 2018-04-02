import os
import requests
import json
import errno
import sys

columns = ["title", "field_offices", "dates_of_birth_used", "sex", "height_min", "weight_min", "hair", "eyes", "nationality", "race_raw", "images", "caution", "description"]

def writenull(data, id):
    filename = "null_columns/" + str(id)
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
        json.dump(data, outfile)
        success = True
            
    return success

def readcriminal(data, id):
    #print(data)
    result = dict()
    nullcount = 0
    result["id"] = id
    for item in columns:
        d = data[item]
        if d == None:
            nullcount += 1
        result[item] = data[item]
    
    if(nullcount > 0):
        writenull([data], id)
    
    return(result)

if __name__ == "__main__":

    suspects = []
    count = 1
    page = 1
  
    while page <= 35:
        url = "https://api.fbi.gov/wanted/v1/list?page=" + str(page)
        response = requests.get(url)
        data = json.loads(response.content)
        items = data['items']
    
        for i in items:  
            if i['caution'] != None:
                if i['title'] != None:
                    if not "UNKNOWN" in i['title']:
                        suspects.append(readcriminal(i, count))
                        count += 1
        page += 1
    
    with open("sus.txt", "w") as outfile:
        json.dump(suspects, outfile)
    
    print("Done.")

