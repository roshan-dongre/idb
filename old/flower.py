import requests
import json
import re

if __name__ == "__main__":
  #response = requests.get("https://en.wikipedia.org/wiki/List_of_U.S._state_and_territory_flowers")
  #print response.content
  #response = requests.get("https://en.wikipedia.org/wiki/List_of_U.S._state_birds")
  #print response.content
  f1 = open("states2.txt","r")
  line = f1.readline()
  data = json.loads(line)
  newdata = []
  f2 = open("flower.csv", "r")
  for state in data:
    line = f2.readline().strip()
    d = line.split(",")
    st = d[0]
    flower = d[1]
    bird = d[2]
    assert(st == state["name"])
    state["flower"] = flower
    state["bird"] = bird
    newdata.append(state)
  
  f3 = open("states3.txt", "w")
  json.dump(newdata, f3)
