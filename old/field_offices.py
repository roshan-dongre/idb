import os
import json
import errno
import sys

OFFICES = {"albany": ["NY"], "albuquerque": ["NM"], "anchorage": ["AK"],
    "atlanta": ["GA"], "baltimore": ["DE", "MD"], "birmingham": ["AL"],
    "boston": ["ME", "MA", "NH", "RI"], "buffalo": ["NY"], "charlotte": ["NC"],
    "chicago": ["IL"], "cincinnati": ["OH"], "cleveland": ["OH"],
    "columbia": ["SC"], "dallas": ["TX"], "denver": ["CO", "WY"],
    "detroit": ["MI"], "elpaso": ["TX"], "honolulu": ["HI"], "houston": ["TX"],
    "indianapolis": ["IN"], "jackson": ["MS"], "jacksonville": ["FL"],
    "kansascity": ["KS", "MO"], "knoxville": ["TN"], "lasvegas": ["NV"],
    "littlerock": ["AR"], "losangeles": ["CA"], "louisville": ["KY"],
    "memphis": ["TN"], "miami": ["FL"], "milwaukee": ["WI"],
    "minneapolis": ["MN", "ND", "SD"], "mobile": ["AL"], "newark": ["NJ"],
    "newhaven": ["CT"], "neworleans": ["LA"], "newyork": ["NY"],
    "norfolk": ["VA"], "oklahomacity": ["OK"], "omaha": ["IA", "NE"],
    "philadelphia": ["PA"], "phoenix": ["AZ"], "pittsburgh": ["PA", "WV"],
    "portland": ["OR"], "richmond": ["VA"], "sacramento": ["CA"],
    "saltlakecity": ["MT", "ID", "UT"], "sanantonio": ["TX"], "sandiego": ["CA"],
    "sanfrancisco": ["CA"], "seattle": ["WA"], "springfield": ["IL"],
    "stlouis": ["MO"], "tampa": ["FL"], "washingtondc": ["VA", "DC"]}

if __name__ == "__main__":
    f1 = "sus2.txt"
    print("Reading data from %s..." % f1)
    infile = open(f1, "r")
    line = infile.readline()
    data = json.loads(line)
    result = []
    for item in data:
        name = item["title"]
        states = set()
        if(item["field_offices"] != None):
            for x in item["field_offices"]:
                if x in OFFICES.keys():
                    y = OFFICES[x]
                    for state in y:
                        states.add(state)
        for state in states:
            print("%s is wanted in %s" % (name, state))
            result.append({"name": name, "state": state})
    

    f2 = "wanted_in.txt"
    print("Writing results to %s..." % f2)
    with open(f2, "w") as outfile:
        json.dump(result, outfile)
    print("Done.")

