import os
import json
import errno
import sys

OFFICES = {"albany": ["NY"], "albuquerque": ["NM"], "anchorage": ["AK"],
    "atlanta": ["GA"], "baltimore": ["MD"], "birmingham": ["AL"],
    "boston": ["MA"], "buffalo": ["NY"], "charlotte": ["NC"],
    "chicago": ["IL"], "cincinnati": ["OH"], "cleveland": ["OH"],
    "columbia": ["SC"], "dallas": ["TX"], "denver": ["CO"],
    "detroit": ["MI"], "elpaso": ["TX"], "honolulu": ["HI"], "houston": ["TX"],
    "indianapolis": ["IN"], "jackson": ["MS"], "jacksonville": ["FL"],
    "kansascity": ["KS"], "knoxville": ["TN"], "lasvegas": ["NV"],
    "littlerock": ["AR"], "losangeles": ["CA"], "louisville": ["KY"],
    "memphis": ["TN"], "miami": ["FL"], "milwaukee": ["WI"],
    "minneapolis": ["MN"], "mobile": ["AL"], "newark": ["NJ"],
    "newhaven": ["CT"], "neworleans": ["LA"], "newyork": ["NY"],
    "norfolk": ["VA"], "oklahomacity": ["OK"], "omaha": ["NE"],
    "philadelphia": ["PA"], "phoenix": ["AZ"], "pittsburgh": ["PA"],
    "portland": ["OR"], "richmond": ["VA"], "sacramento": ["CA"],
    "saltlakecity": ["UT"], "sanantonio": ["TX"], "sandiego": ["CA"],
    "sanfrancisco": ["CA"], "seattle": ["WA"], "springfield": ["IL"],
    "stlouis": ["MO"], "tampa": ["FL"], "washingtondc": ["DC"]}

if __name__ == "__main__":
    f1 = "sus.txt"
    print("Reading data from %s..." % f1)
    infile = open(f1, "r")
    line = infile.readline()
    data = json.loads(line)
    result = []
    for item in data:
        id = item["id"]
        if(item["field_offices"] != None):
            for x in item["field_offices"]:
                if x in OFFICES.keys():
                    state = OFFICES[x][0]
                    print("#%d is wanted in %s" % (id, state))
                    result.append({"id": id, "state": state})
    f2 = "wanted_in2.txt"
    print("Writing results to %s..." % f2)
    with open(f2, "w") as outfile:
        json.dump(result, outfile)
    print("Done.")

