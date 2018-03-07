import os
import json
import sys

ITEMS = ["offenses", "offenders", "victims"]

statelist = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
    "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "DC", "WV", "WI", "WY"]
    
poplist = {"AL": 4863300, "AK": 741894, "AZ": 6931071, "AR": 2988248, "CA": 39250017,
    "CO": 5540545, "CT": 3576452, "DE": 952065, "FL": 20612439, "GA": 10310371,
    "HI": 1428557, "ID": 1683140, "IL": 12801539, "IN": 6633053, "IA": 3134693,
    "KS": 2907289, "KY": 4436974, "LA": 4681666, "ME": 1331479, "MD": 6016447,
    "MA": 6811779, "MI": 9928300, "MN": 5519952, "MS": 2988726, "MO": 6093000,
    "MT": 1042520, "NE": 1907116, "NV": 2940058, "NH": 1334795, "NJ": 8944469,
    "NM": 2081015, "NY": 19745289, "NC": 10146788, "ND": 757952, "OH": 11614373,
    "OK": 3923561, "OR": 4093465, "PA": 12784227, "RI": 1056426, "SC": 4961119,
    "SD": 865454, "TN": 6651194, "TX": 27862596, "UT": 3051217, "VT": 624594,
    "VA": 8411808, "WA": 7288000, "DC": 681170, "WV": 1831102, "WI": 5778708,
    "WY": 585501, "": 323127513}
    
idlist = dict()

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

def readfiles(state=""):
    statedir = "states/" + state + "/"
    if(state == ""):
        statedir = "national/"
    
    population = poplist[state]
        
    result = []
    
    infile1 = open(statedir + ITEMS[0], "r")
    infile2 = open(statedir + ITEMS[1], "r")
    infile3 = open(statedir + ITEMS[2], "r")
    offensedata = json.loads(infile1.readline())
    offenderdata = json.loads(infile2.readline())
    victimdata = json.loads(infile3.readline())
    for d in offensedata:
        crime = d["offense_name"]
        
        if not(crime in idlist.keys()):
            continue
        
        id = idlist[crime]
        count = d["count"]
        offenders = None
        victims = None
        perpop = None
        
        if count != None:
            for d2 in offenderdata:
                if crime in d2.values():
                    offenders = d2["count"]
                    break
        
            for d2 in victimdata:
                if crime in d2.values():
                    victims = d2["count"]
                    break
        
        
            perpop = count * 100000.0 / population
        
        entry = {"crime_id": id, "name": crime, "count": count,
            "offenders": offenders, "victims": victims, "per_population": perpop}
        
        if(state != ""):
            sid = statelist.index(state) + 1
            entry["state_id"] = sid
        
        result.append(entry)
    
    outfile = "json/" + state
    if(state == ""):
        outfile = "json/national"
    
    if not write_crime(result, outfile):
        print("Write failed.")
    
    return(result)


if __name__ == "__main__":

    idlist = dict()
    
    idfile = open("crime_ids.txt", "r")
    for line in idfile:
        data = line.split(":")
        id = int(data[0])
        crime = data[1].strip()
        idlist[crime] = id
    
    
    readfiles()
    for state in statelist:
        readfiles(state)
        
    print("Done.")

