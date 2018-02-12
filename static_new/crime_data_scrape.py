import requests
import json

def scrape(url):
  response = requests.get(url)
  data = json.loads(response.content)
  result = data['results']
  print(len(result))
  for i in range(len(result)):
    offense = result[i]['offense_name']
    count = result[i]['count']
    if(count == None):
      count = 0
    print("%s: %d" % (offense, count))
  print("")

if __name__ == '__main__':
  print("\nNATIONAL DATA")
  #Returns number of counts for different offense types nationally in 2016.
  scrape("https://api.usa.gov/crime/fbi/ucr/offenses/count/national/offense_name?page=1&per_page=100&year=2016&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  
  #Returns number of offenders for different offense types
  #nationally in 2016.
  scrape("https://api.usa.gov/crime/fbi/ucr/offenders/count/national/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  
  #Returns number of victims of different offense types in 2016.
  scrape("https://api.usa.gov/crime/fbi/ucr/victims/count/national/offense_name?page=1&per_page=100&year=2016&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  
  
  #Maryland
  print("MARYLAND DATA")
  #offenses
  scrape("https://api.usa.gov/crime/fbi/ucr/offenses/count/states/MD/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  #offenders
  scrape("https://api.usa.gov/crime/fbi/ucr/offenders/count/states/MD/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  #victims
  scrape("https://api.usa.gov/crime/fbi/ucr/victims/count/states/MD/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  
  #Ohio
  print("OHIO DATA")
  #offenses
  scrape("https://api.usa.gov/crime/fbi/ucr/offenses/count/states/OH/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  #offenders
  scrape("https://api.usa.gov/crime/fbi/ucr/offenders/count/states/OH/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  #victims
  scrape("https://api.usa.gov/crime/fbi/ucr/victims/count/states/OH/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  
  
  #Oregon
  print("OREGON DATA")
  #offenses
  scrape("https://api.usa.gov/crime/fbi/ucr/offenses/count/states/OR/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  #offenders
  scrape("https://api.usa.gov/crime/fbi/ucr/offenders/count/states/OR/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")
  #victims
  scrape("https://api.usa.gov/crime/fbi/ucr/victims/count/states/OR/offense_name?year=2016&page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv")

  