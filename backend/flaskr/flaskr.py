import os
from flask import jsonify, request, session, g, redirect, url_for, abort
from sqlalchemy.sql import select, asc, desc
from models import State, Criminal, Crime, CrimesState, CrimesCriminal, CriminalState, app, db
import ast
import json
import unicodedata
import random

"""" "" "" "" "" "
"    Globals     "
"" "" "" "" "" """

statelist = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "DC", "WV", "WI", "WY"]
statenames = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachussetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Washington DC", "West Virginia", "Wisconsin", "Wyoming"]
criminal_loc = ["DC", "TN", "NV", "CA", "OH", "UT", "PA", "DC", "TX", "OR", "FL", "UT", "DC", "DC", "DC", "DC", "OR", "CO", "AL", "VA", "UT", "OK", "FL", "NY", "CA", "NY", "MI", "CA", "NC", "WA", "CA", "DC", "VA", "NJ", "CA", "FL", "NJ", "TX", "SC", "SC", "NY", "NY", "CA", "PA", "CA", "CA", "NY", "HI", "DC", "MD", "TX", "TX", "TX", "GA", "GA", "GA", "NV", "CA", "CA", "CA", "SC", "OR", "OR", "TX", "KS", "KS", "MI", "PA", "PA", "PA", "HI", "CA", "FL", "FL", "CA", "IL", "IL", "WI", "MD", "MD", "NY", "NY", "GA", "NJ", "MD", "GA", "IL", "MD", "SC", "CA", "GA", "CO", "CO", "GA", "MD", "GA", "CA", "CA", "MI", "CA", "OR", "CA", "CA", "NJ", "AL", "CA", "IL", "MI", "CA", "CA", "CA", "PA", "IL", "NJ", "PA", "NY", "MI", "AZ", "AZ", "TX", "PA", "NY", "LA", "AR", "CA", "FL", "FL", "FL", "NY", "PA", "MD", "CA", "NC", "PA", "SC", "NY", "NY", "NY", "NY", "NY", "NJ", "NY", "NE", "NJ", "NY", "NE", "PA", "GA", "DC", "DC", "NY", "OR", "PA", "CA", "SC", "IL", "CA", "KS", "CO", "PA", "PA", "CO", "OR", "GA", "AL", "FL", "MI", "CO", "KS", "IL", "NM", "IL", "TX", "GA", "IL", "OR", "CA", "CA", "CA", "GA", "CA", "CA", "CA", "CO", "CA", "OH", "MD", "LA", "TX", "VA", "CA", "NJ", "DC", "FL", "FL", "FL", "FL", "FL", "FL", "NV", "CA", "NE", "NY", "NY", "FL", "NJ", "CA", "CA", "FL", "MN", "MS", "FL", "CA", "AR", "FL", "OR", "PA", "CA", "PA", "MO", "TN", "AR", "IL", "SC", "CA", "IL", "IL", "IL", "IL", "IL", "OK", "OH", "NJ", "AR", "AR", "NY", "AR", "NM", "NY", "NY", "NY", "NY", "NY", "NY", "NY", "WI", "TX", "TX", "NE", "NE", "NE", "NE", "NY", "CA", "HI", "NJ", "PA", "OR", "NY", "NY", "NY", "MA", "NY", "DC", "NY", "NY", "AL", "OR", "NY", "NY", "FL", "DC", "DC", "DC", "NY", "DC", "NY", "DC", "DC", "FL", "NY", "OR", "NJ", "NJ", "TX", "NJ", "DC", "NY", "NY"]

"""" "" "" "" "" "
" Helper Funcs   "
"" "" "" "" "" """
def get_lim_off():
    limit = request.args.get('limit','')
    if limit == '':
        limit = 289
    offset = request.args.get('offset','')
    if offset == '':
        offset = 0
    offset = int(offset)*int(limit)
    return {'lim': limit,'off': offset}

"""" "" "" "" "" "
" API Endpoints  "
"" "" "" "" "" """

@app.route('/states', methods=['GET'])#, subdomain="api")
def get_states():
    page_res = get_lim_off()
    filt_pop_min = request.args.get('population_min','')
    filt_pop_max = request.args.get('population_max','')
    filt_region = request.args.get('region','')
    filt_area_min = request.args.get('area_min','')
    filt_area_max = request.args.get('area_max','')
    sort_name = request.args.get('sort_name','')
    sort_area = request.args.get('sort_area','')
    my_query = {}
    my_query['totalCount'] = db.session.query(State)
    my_query['results'] = State.query
    if filt_pop_min != '':
        my_query['totalCount'] = my_query['totalCount'].filter(State.population>=int(filt_pop_min))
        my_query['results'] = my_query['results'].filter(State.population>=int(filt_pop_min))
    if filt_pop_max != '':
        my_query['totalCount'] = my_query['totalCount'].filter(State.population<=int(filt_pop_max))
        my_query['results'] = my_query['results'].filter(State.population<=int(filt_pop_max))
    if filt_region != '':
        my_query['totalCount'] = my_query['totalCount'].filter_by(region=filt_region)
        my_query['results'] = my_query['results'].filter_by(region=filt_region)
    if filt_area_min != '':
        my_query['totalCount'] = my_query['totalCount'].filter(State.area>=int(filt_area_min))
        my_query['results'] = my_query['results'].filter(State.area>=int(filt_area_min))
    if filt_area_max != '':
        my_query['totalCount'] = my_query['totalCount'].filter(State.area<=int(filt_area_max))
        my_query['results'] = my_query['results'].filter(State.area<=int(filt_area_max))
    if sort_name == "ASC":
        my_query['results'] = my_query['results'].order_by(asc(State.name))
    elif sort_name == "DESC":
        my_query['results'] = my_query['results'].order_by(desc(State.name))
    if sort_area == "ASC":
        my_query['results'] = my_query['results'].order_by(asc(State.area))
    elif sort_area == "DESC":
        my_query['results'] = my_query['results'].order_by(desc(State.area))
    my_query['totalCount'] = my_query['totalCount'].count()
    my_query['results'] = ast.literal_eval(str(my_query['results'].offset(page_res['off']).limit(page_res['lim']).all()))
    return jsonify(my_query)

@app.route('/states/<string:state_name>', methods=['GET'])#, subdomain="api")
def get_state(state_name):
    if(str(state_name).isdigit()):
        return jsonify(ast.literal_eval(str(State.query.filter_by(id=state_name).first())))
    if len(state_name) == 2:
        return jsonify(ast.literal_eval(str(State.query.filter_by(abbreviation=state_name).first())))
    else:    
        return jsonify(ast.literal_eval(str(State.query.filter_by(name=state_name).first())))

@app.route('/criminals', methods=['GET'])#, subdomain="api")
def get_criminals():
    page_res = get_lim_off()
    gender = request.args.get('sex','')
    filt_height_min = request.args.get('height_min', '')
    filt_height_max = request.args.get('height_max', '')
    filt_race = request.args.get('race','')
    sort_name = request.args.get('sort_name','')
    sort_height = request.args.get('sort_height','')
    my_query = {}
    my_query['totalCount'] = db.session.query(Criminal)
    my_query['results'] = Criminal.query
    if gender != '':
        my_query['totalCount'] = my_query['totalCount'].filter_by(sex=gender)
        my_query['results'] = my_query['results'].filter_by(sex=gender)
    if filt_height_min != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Criminal.height>=filt_height_min)
        my_query['results'] = my_query['results'].filter(Criminal.height>=filt_height_min)
    if filt_height_max != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Criminal.height<=filt_height_max)
        my_query['results'] = my_query['results'].filter(Criminal.height<=filt_height_max)
    if filt_race != '':
        my_query['totalCount'] = my_query['totalCount'].filter_by(race=filt_race)
        my_query['results'] = my_query['results'].filter_by(race=filt_race)
    if sort_name == "ASC":
        my_query['results'] = my_query['results'].order_by(asc(Criminal.name))
    elif sort_name == "DESC":
        my_query['results'] = my_query['results'].order_by(desc(Criminal.name))
    if sort_height == "ASC":
        my_query['results'] = my_query['results'].order_by(asc(Criminal.height))
    elif sort_height == "DESC":
        my_query['results'] = my_query['results'].order_by(desc(Criminal.height))
    my_query['totalCount'] = my_query['totalCount'].count()
    my_query['results'] = ast.literal_eval(str(my_query['results'].offset(page_res['off']).limit(page_res['lim']).all()))
    return jsonify(my_query)

@app.route('/criminals/<int:crim_id>', methods=['GET'])#, subdomain="api")
def get_criminal(crim_id):
    return jsonify(ast.literal_eval(str(Criminal.query.filter_by(id=crim_id).first())))

@app.route('/crimes', methods=['GET'])#, subdomain="api")
def get_crimes():
    page_res = get_lim_off()
    filt_count_min = request.args.get('count_min','')
    filt_count_max = request.args.get('count_max','')
    filt_offen_min = request.args.get('offenders_min','')
    filt_offen_max = request.args.get('offenders_max','')
    filt_vict_min = request.args.get('victims_min', '')
    filt_vict_max = request.args.get('victims_max', '')
    sort_name = request.args.get('sort_name','')
    sort_count = request.args.get('sort_count','')
    my_query = {}
    my_query['totalCount'] = db.session.query(Crime)
    my_query['results'] = Crime.query
    if filt_count_min != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Crime.count>=int(filt_count_min))
        my_query['results'] = my_query['results'].filter(Crime.count>=int(filt_count_min))
    if filt_count_max != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Crime.count<=int(filt_count_max))
        my_query['results'] = my_query['results'].filter(Crime.count<=int(filt_count_max))
    if filt_offen_min != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Crime.offenders>=int(filt_offen_min))
        my_query['results'] = my_query['results'].filter(Crime.offenders>=int(filt_offen_min))
    if filt_offen_max != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Crime.offenders<=int(filt_offen_max))
        my_query['results'] = my_query['results'].filter(Crime.offenders<=int(filt_offen_max))
    if filt_vict_min != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Crime.victims>=int(filt_vict_min))
        my_query['results'] = my_query['results'].filter(Crime.victims>=int(filt_vict_min))
    if filt_vict_max != '':
        my_query['totalCount'] = my_query['totalCount'].filter(Crime.victims<=int(filt_vict_max))
        my_query['results'] = my_query['results'].filter(Crime.victims<=int(filt_vict_max))
    if sort_name == "ASC":
        my_query['results'] = my_query['results'].order_by(asc(Crime.name))
    elif sort_name == "DESC":
        my_query['results'] = my_query['results'].order_by(desc(Crime.name))
    if sort_count == "ASC":
        my_query['results'] = my_query['results'].order_by(asc(Crime.count))
    elif sort_count == "DESC":
        my_query['results'] = my_query['results'].order_by(desc(Crime.count))
    my_query['totalCount'] = my_query['totalCount'].count()
    my_query['results'] = ast.literal_eval(str(my_query['results'].offset(page_res['off']).limit(page_res['lim']).all()))
    return jsonify(my_query)

@app.route('/crimes/state/<int:stat_id>', methods=['GET'])#, subdomain="api")
def get_crimesperstate(stat_id):
    return jsonify(ast.literal_eval(str(CrimesState.query.filter_by(state_id=stat_id).all())))

@app.route('/crimes/<int:crim_id>', methods=['GET'])#, subdomain="api")
def get_crime(crim_id):
    return jsonify(ast.literal_eval(str(Crime.query.filter_by(id=crim_id).first())))

@app.route('/crimestostate', methods=['GET'])#, subdomain="api")
def get_crimetostate():
    return jsonify(ast.literal_eval(str(CrimesState.query.all())))

@app.route('/crimestostate/<string:id_val>', methods=['GET'])#, subdomain="api")
def get_crimestostate(id_val):
    if(str(id_val).isdigit()):
        return jsonify(ast.literal_eval(str(CrimesState.query.filter_by(crime_id=id_val).all())))
    if len(id_val) == 2:
        TempState = ast.literal_eval(str(State.query.filter_by(abbreviation=id_val).first()))
        return jsonify(ast.literal_eval(str(CrimesState.query.filter_by(state_id=TempState['id']).all())))

@app.route('/criminalstostate', methods=['GET'])#, subdomain="api")
def get_criminaltostate():
    return jsonify(ast.literal_eval(str(CriminalState.query.all())))

@app.route('/criminalstostate/<string:id_val>', methods=['GET'])#, subdomain="api")
def get_criminalstostate(id_val):
    if(str(id_val).isdigit()):
        return jsonify(ast.literal_eval(str(CriminalState.query.filter_by(criminal_id=id_val).all())))
    if len(id_val) == 2:
        return jsonify(ast.literal_eval(str(CriminalState.query.filter_by(state_name=id_val).all())))

@app.route('/crimestocriminals', methods=['GET'])#, subdomain="api")
def get_crimestocriminals():
    return jsonify(ast.literal_eval(str(CrimesCriminal.query.all())))

@app.route('/crimetocriminals/<int:catch_id>', methods=['GET'])#, subdomain="api")
def get_crimetocriminals(catch_id):
    return jsonify(ast.literal_eval(str(CrimesCriminal.query.filter_by(crime_id=catch_id).all())))

@app.route('/criminaltocrimes/<int:catch_id>', methods=['GET'])#, subdomain="api")
def get_criminalstocrime(catch_id):
    return jsonify(ast.literal_eval(str(CrimesCriminal.query.filter_by(criminal_id=catch_id).all())))

#404 handling for api 
@app.errorhandler(404)
def pageNotFound(error):
    return redirect("https://roshan-dongre.gitbooks.io/api/")

"""" "" "" "" "" "
" Database Init  "
"" "" "" "" "" """

# if __name__ == '__main__':
def mainFunc():
    db.reflect()
    db.drop_all()
    db.create_all()
    print("DB has been created...")

    print("Populating Criminals...")
    # Populating Criminals
    data = json.load(open('criminal_data/sus.txt'))
    criminal_i = 0
    for person in data:
        NewName = person["title"]
        NewFieldOffice = person["field_offices"]
        if NewFieldOffice == None:
            NewFieldOffice = ["None"]
        NewHeight = person["height_min"]
        NewWeight = person["weight_min"]
        NewSex = person["sex"]
        NewHair = person["hair"]
        NewEyes = person["eyes"]
        NewDob = person["dates_of_birth_used"]
        if NewDob == None:
            NewDob = ["None"]
        NewRace = person["race_raw"]
        NewNationality = person["nationality"]
        NewCrime = person["caution"]
        NewImage = person["images"]
        NewState = criminal_loc[criminal_i]
        criminal_i += 1
        NewCriminal = Criminal(name=NewName,
                              field_office=NewFieldOffice[0],
                              height=NewHeight,
                              weight=NewWeight,
                              sex=NewSex,
                              hair=NewHair,
                              eyes=NewEyes,
                              dob=NewDob[0],
                              race=NewRace,
                              nationality=NewNationality,
                              crime=NewCrime,
                              image=NewImage[0]["large"],
                              state=NewState,
                              type="criminal",
                              fbi=NewImage[0]["large"].split('@')[0])
        db.session.add(NewCriminal)

    print("Populating Crimes...")
    # Populating Crimes
    data = json.load(open('crime_data/json/national'))
    with open('crime_data/crime_ids.txt') as fp:
        line = fp.readline()
        i = 1;
        while line:
            strLine = str(line).split(":") 
            NewImage = "https://raw.githubusercontent.com/roshan-dongre/idb/master/backend/data/crimephotos/"+str(i)+".jpg"
            NewOffenders = data[i-1]['offenders']
            NewVictims = data[i-1]['victims']
            NewCount = data[i-1]['count']
            i += 1
            NewDesc = strLine[2]
            NewCrime = Crime(name=strLine[1].strip(),
                            image=NewImage,
                            description=NewDesc.strip(),
                            victims=NewVictims,
                            offenders=NewOffenders,
                            count=NewCount,
                            type="crime")
            db.session.add(NewCrime)
            line = fp.readline()

    print("Populating States...")
    # Populating States
    data = json.load(open('state_data/states2.txt'))
    for file_state in data:
        NewState = State(population=file_state['population'],
                        abbreviation=file_state['abbreviation'],
                        image= file_state['image'],
                        name= file_state['name'],
                        density= file_state['density'],
                        area= file_state['area'],
                        capital= file_state['capital'],
                        region= file_state['region'],
                        flower= file_state['flower'],
                        bird= file_state['bird'],
                        type="state",
                        wiki="http://wikipedia.org/wiki/"+file_state['name'].replace(" ", "_"))
        db.session.add(NewState)

    print("Linking models together...")
    # Populating Crime to State relationship
    for abv in statelist:
        with open('crime_data/json/'+abv) as fp:
            data = json.loads(fp.readline())
            for x in data:
                if x['count'] != None:
                    if x['count'] > 0:
                        NewStateId = x['state_id']
                        NewStateAbv = ast.literal_eval(str(State.query.filter_by(id=NewStateId).first()))
                        NewCrimeId = x['crime_id']
                        NewCrimeName = ast.literal_eval(str(Crime.query.filter_by(id=NewCrimeId).first()))
                        NewCrimeState = CrimesState(state_id=NewStateId,
                                                    state_abbreviation=NewStateAbv['abbreviation'],
                                                    state_name=NewStateAbv['name'],
                                                    crime_id=NewCrimeId,
                                                    crime_name=NewCrimeName['name'])
                        db.session.add(NewCrimeState)

    # Populating Crime to Criminal relationship
    data = json.load(open('criminal_data/sus2.txt'))
    for person in data:
        NewCriminal = ast.literal_eval(str(Criminal.query.filter_by(name=person['title']).first()))
        if NewCriminal != None:
            for x in person['crimes']:
                NewCrime = ast.literal_eval(str(Crime.query.filter_by(id=x).first()))
                NewCrimeCriminal = CrimesCriminal(crime_id=NewCrime['id'],
                                                crime_name=NewCrime['name'],
                                                criminal_id=NewCriminal['id'],
                                                criminal_name=NewCriminal['name'])
                db.session.add(NewCrimeCriminal)

    # Populating Criminal to State relationship
    data = json.load(open('criminal_data/wanted_in.txt'))
    for entry in data:
        NewCriminal = ast.literal_eval(str(Criminal.query.filter_by(name=entry['name']).first()))
        if(NewCriminal==None):
            continue
        NewState = ast.literal_eval(str(State.query.filter_by(abbreviation=entry['state']).first()))
        NewCriminalState = CriminalState(state_id=NewState['id'],
                                        state_name=NewState['abbreviation'],
                                        criminal_id=NewCriminal['id'],
                                        criminal_name=NewCriminal['name'])
        db.session.add(NewCriminalState)

    db.session.commit()
    print("DB done!\n")
    app.run(host='0.0.0.0', port=80)
