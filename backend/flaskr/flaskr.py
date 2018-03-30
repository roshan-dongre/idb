import os
from flask import jsonify, request, session, g, redirect, url_for, abort
from sqlalchemy.sql import select, asc, desc
from models import State, Criminal, Crime, CrimesState, CrimesCriminal, app, db
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
    filt_pop = request.args.get('population','')
    sort_name = request.args.get('sort','')
    my_query = {}
    if filt_pop == '':
        my_query['totalCount'] = db.session.query(State).count()
        if sort_name == "ASC":
            my_query['states'] = ast.literal_eval(str(State.query.order_by(asc(State.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        elif sort_name == "DESC":
            my_query['states'] = ast.literal_eval(str(State.query.order_by(desc(State.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        else:
            my_query['states'] = ast.literal_eval(str(State.query.offset(page_res['off']).limit(page_res['lim']).all()))
    else:
        my_query['totalCount'] = db.session.query(State).filter(State.population>=int(filt_pop)).count()
        if sort_name == "ASC":
            my_query['states'] = ast.literal_eval(str(State.query.filter(State.population>=int(filt_pop)).order_by(asc(State.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        elif sort_name == "DESC":
            my_query['states'] = ast.literal_eval(str(State.query.filter(State.population>=int(filt_pop)).order_by(desc(State.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        else:
            my_query['states'] = ast.literal_eval(str(State.query.filter(State.population>=int(filt_pop)).offset(page_res['off']).limit(page_res['lim']).all()))
    return jsonify(my_query)

@app.route('/states/<string:state_name>', methods=['GET'])#, subdomain="api")
def get_state(state_name):
    if(str(state_name).isdigit()):
        return jsonify(ast.literal_eval(str(State.query.filter_by(id=state_name).first())))
    if len(state_name) == 2:
        return jsonify(ast.literal_eval(str(State.query.filter_by(abbreviation=state_name).first())))
    else:    
        return jsonify(ast.literal_eval(str(Crime.query.filter_by(name=state_name).first())))

@app.route('/criminals', methods=['GET'])#, subdomain="api")
def get_criminals():
    page_res = get_lim_off()
    gender = request.args.get('sex','')
    sort_name = request.args.get('sort','')
    if gender == '':
        totalCount = db.session.query(Criminal).count()
        if sort_name == "ASC":
            return jsonify({'totalCount': totalCount, 'criminals': ast.literal_eval(str(Criminal.query.order_by(asc(Criminal.name)).offset(page_res['off']).limit(page_res['lim']).all()))})
        if sort_name == "DESC":
            return jsonify({'totalCount': totalCount, 'criminals': ast.literal_eval(str(Criminal.query.order_by(desc(Criminal.name)).offset(page_res['off']).limit(page_res['lim']).all()))})
        return jsonify({'totalCount': totalCount, 'criminals': ast.literal_eval(str(Criminal.query.filter(Criminal.id>page_res['off']).limit(page_res['lim']).all()))})
    totalCount = db.session.query(Criminal).filter_by(sex=gender).count()
    if sort_name == "ASC":
        return jsonify({'totalCount': totalCount, 'criminals': ast.literal_eval(str(Criminal.query.filter_by(sex=gender).order_by(asc(Criminal.name)).offset(page_res['off']).limit(page_res['lim']).all()))})
    if sort_name == "DESC":
        return jsonify({'totalCount': totalCount, 'criminals': ast.literal_eval(str(Criminal.query.filter_by(sex=gender).order_by(desc(Criminal.name)).offset(page_res['off']).limit(page_res['lim']).all()))})
    return jsonify({'totalCount': totalCount, 'criminals': ast.literal_eval(str(Criminal.query.filter(Criminal.id>page_res['off']).filter_by(sex=gender).limit(page_res['lim']).all()))})

@app.route('/criminals/<int:crim_id>', methods=['GET'])#, subdomain="api")
def get_criminal(crim_id):
    return jsonify(ast.literal_eval(str(Criminal.query.filter_by(id=crim_id).first())))

@app.route('/crimes', methods=['GET'])#, subdomain="api")
def get_crimes():
    page_res = get_lim_off()
    filt_pop = request.args.get('population','')
    sort_name = request.args.get('sort','')
    my_query = {}
    if filt_pop == '':
        my_query['totalCount'] = db.session.query(Crime).count()
        if sort_name == "ASC":
            my_query['crimes'] = ast.literal_eval(str(Crime.query.order_by(asc(Crime.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        elif sort_name == "DESC":
            my_query['crimes'] = ast.literal_eval(str(Crime.query.order_by(desc(Crime.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        else:
            my_query['crimes'] = ast.literal_eval(str(Crime.query.offset(page_res['off']).limit(page_res['lim']).all()))
    else:
        my_query['totalCount'] = db.session.query(Crime).filter(Crime.population>=int(filt_pop)).count()
        if sort_name == "ASC":
            my_query['crimes'] = ast.literal_eval(str(Crime.query.filter(Crime.population>=int(filt_pop)).order_by(asc(Crime.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        elif sort_name == "DESC":
            my_query['crimes'] = ast.literal_eval(str(Crime.query.filter(Crime.population>=int(filt_pop)).order_by(desc(Crime.name)).offset(page_res['off']).limit(page_res['lim']).all()))
        else:
            my_query['crimes'] = ast.literal_eval(str(Crime.query.filter(Crime.population>=int(filt_pop)).offset(page_res['off']).limit(page_res['lim']).all()))
    return jsonify(my_query)
    # return jsonify({'totalCount': db.session.query(Crime).count(), 'crimes': ast.literal_eval(str(Crime.query.filter(Crime.id>offset).limit(limit).all()))})

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
    ans = []
    for x in statelist:
        for y in ast.literal_eval(str(Criminal.query.filter_by(state=x).all())):
            ans += [{'id': y['id'], 'state': x}]
    return jsonify(ans)

@app.route('/criminalstostate/<string:id_val>', methods=['GET'])#, subdomain="api")
def get_criminalstostate(id_val):
    if(str(id_val).isdigit()):
        return jsonify([{'state' : ast.literal_eval(str(Criminal.query.filter_by(id=id_val).first()))['state'], 'id' : ast.literal_eval(str(Criminal.query.filter_by(id=id_val).first()))['id']}])
    if len(id_val) == 2:
        return jsonify(ast.literal_eval(str(Criminal.query.filter_by(state=id_val).all())))

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

if __name__ == '__main__':
    db.reflect()
    db.drop_all()
    db.create_all()

    # Populating Criminals
    data = json.load(open('../criminal_data/sus.txt'))
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
                              state=NewState)
        db.session.add(NewCriminal)

    # Populating Crimes
    data = json.load(open('../crime_data/json/national'))
    with open('../crime_data/crime_ids.txt') as fp:
        line = fp.readline()
        i = 1;
        while line:
            strLine = str(line).split(":") 
            NewImage = "https://raw.githubusercontent.com/roshan-dongre/idb/master/crimephotos/"+str(i)+".jpg"
            NewOffenders = data[i-1]['offenders']
            NewVictims = data[i-1]['victims']
            NewCount = data[i-1]['count']
            i += 1
            NewDesc = strLine[2]
            if(isinstance(NewDesc,str)):
            	NewDesc = unicode(NewDesc, "utf-8")
            NewCrime = Crime(name=strLine[1],
                            image=NewImage,
                            description=NewDesc,
                            victims=NewVictims,
                            offenders=NewOffenders,
                            count=NewCount)
            db.session.add(NewCrime)
            line = fp.readline()

    # Populating States
    data = json.load(open('../state_data/states2.txt'))
    for file_state in data:
        NewState = State(population=file_state['population'],
                        abbreviation=file_state['abbreviation'],
                        image= file_state['image'],
                        name= file_state['name'],
                        density= file_state['density'],
                        area= file_state['area'],
                        capital= file_state['capital'])
        db.session.add(NewState)

    # Populating Crime to State relationship
    for abv in statelist:
        with open('../crime_data/json/'+abv) as fp:
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
    data = json.load(open('../criminal_data/sus2.txt'))
    for person in data:
        NewCriminal = ast.literal_eval(str(Criminal.query.filter_by(name=person['title']).first()))
        for x in person['crimes']:
            NewCrime = ast.literal_eval(str(Crime.query.filter_by(id=x).first()))
            NewCrimeCriminal = CrimesCriminal(crime_id=NewCrime['id'],
                                            crime_name=NewCrime['name'],
                                            criminal_id=NewCriminal['id'],
                                            criminal_name=NewCriminal['name'])
            db.session.add(NewCrimeCriminal)

    db.session.commit()
    print("Created db\n\n\n")
    app.run(host='0.0.0.0', port=5000)
