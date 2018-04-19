from flask import jsonify, request, session, g, redirect, url_for, abort
from sqlalchemy.sql import select, asc, desc
from models import State, Criminal, Crime, CrimesState, CrimesCriminal, CriminalState, app, db
import ast, json, os

"""" "" "" "" "" "
" Routing Funcs  "
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
