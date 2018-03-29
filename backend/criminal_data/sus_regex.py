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
            
    return(success)

if __name__ == "__main__":
    infile = open("sus.txt", "r")
    line = infile.readline()
    data = json.loads(line)
    count = {v: 0 for v in keywords.values()}
    used = set()
    newdata = []
    for sus in data:
        id = sus["id"]
        desc = sus["description"]
        cau = sus["caution"]
        crimes = set()
        for word in keywords.keys():
            d = re.search(word, desc, re.I)
            c = re.search(word, cau, re.I)
            if(d != None or c != None):
                used.add(id)
                crime = keywords[word]
                count[crime] += 1
                
                if(crime in spec_code.keys()):
                    toadd = spec_code[crime]
                    for v in toadd:
                        print("Suspect %d committed crime %d" % (id, v))
                        crimes.add(v)
                elif(crime in indet_code.keys()):
                   print("%d: indeterminate category- %s" % (id, indet_code[crime]))
                   filename = "indet_%s/%d" % (indet_code[crime], id)
                   write_crime([sus], filename)
                else:
                    print("Suspect %d committed crime %d" % (id, crime))
                    crimes.add(crime)
        
        t = list(crimes)
        t.sort()
        sus["crimes"] = t
        newdata.append(sus)
        
    #print("Unused suspect IDs: %s" % [i+1 for i in range(len(data)) if not i+1 in used])
    print("Unused suspect IDs: %s" % [i+1 for i in range(len(data)) if len(newdata[i]["crimes"]) == 0])
    print("Usage of keyword results: %s" % count)
    write_crime(newdata, "./sus2.txt")
    print("Done.")
