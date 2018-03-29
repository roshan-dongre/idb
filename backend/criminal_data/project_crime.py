import re
import json
import os
import sys
import errno

keywords = {"assault": "A", "stole": "T", "larceny": "T", "theft": "T", "arson": 4,
    "prostit": "P", "bribe": 7, "burgl": 8, "counterfeit": 9, "fraud": "F",
    "credit card": 10, "destruction of": 11, "explos": "Ex", "drug": "D", "embez": 14,
    "extort": 15, "false pre": 16, "fondl": 17, "hack": 19, "human": 20,
    "identity th": 22, "kidnap": 27, "abduct": 27, "murder": 29, "manslaughter": 30,
    "porn": 33, "rape": 37, "robb": 38, "sodomy": 42, "statutory": 44, "weapon": "W",
    "gun": "W", "firearm": "W", "wire": 52}
    
spec_code = {"Ex": [4, 11]}

indet_code = {"A": "assault", "T": "theft", "P": "prostitution", "F": "fraud",
    "D": "drugs", "W": "weapons"}



if __name__ == "__main__":
    infile = open("sus2.txt", "r")
    line = infile.readline()
    data = json.loads(line)
    newdata = []
    for sus in data:
        id = sus["id"]
        name = sus["title"]
        crimes = sus["crimes"]
        entry = {"id": id, "title": name, "crimes": crimes}
        newdata.append(entry)
        
    #print("Unused suspect IDs: %s" % [i+1 for i in range(len(data)) if not i+1 in used])
    outfile = open("sus_crimes.txt", "w")
    json.dump(newdata, outfile)
    print(newdata[0])
