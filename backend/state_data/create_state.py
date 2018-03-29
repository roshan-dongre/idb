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
    f1 = open("stateinfo.txt", "r")
    line = f1.readline()
    data = json.loads(line)
    f2 = open("statearea.csv", "r")
    f2.readline()
    areas = dict()
    for i in range(51):
        line = f2.readline()
        d = line.split(",")
        name = d[0]
        area = int(float(d[2]))
        areas[name] = area
    
    newdata = []
    for state in data:
        name = state["name"]
        abb = state["abbreviation"]
        pop = state["population"]
        area = areas[name]
        density = float(pop) / float(area)
        fo = []
        for k in OFFICES.keys():
            if abb in OFFICES[k]:
                fo.append(k)
        state["area"] = area
        state["density"] = density
        state["field_offices"] = fo
        newdata.append(state)
    with open("states2.txt", "w") as outfile:
        json.dump(newdata, outfile)
    
