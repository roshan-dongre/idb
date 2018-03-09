import os
import sqlite3
from flask import Flask, jsonify, request, session, g, redirect, url_for, abort, \
     render_template, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import ast

app = Flask(__name__) # create the application instance :)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mydb.db' # load config from this file , flaskr.py
CORS(app)
db = SQLAlchemy(app)

class State(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True)
    count = db.Column(db.Integer)
    victims = db.Column(db.Integer)
    name = db.Column(db.String(80), nullable=False)
    per_population = db.Column(db.Float)
    ans = [
        {
            'id': id,
            'count': count,
            'victims': victims,
            'name': name,
            'per_population': per_population
        }
    ]

    def myjson(self):
        return self.ans
    def __repr__(self):
        return "{'id': %r, 'count': %r, 'victims': %r, 'name': %r, 'per_population': %r}" % (self.id, self.count, self.victims, self.name, self.per_population)

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]

@app.route('/api', methods=['GET'])
def get_tasks():
    print(State.query.all())
    return jsonify({'states': ast.literal_eval(str(State.query.all()))})

@app.route('/api/states', methods=['GET'])
def get_states():
    return jsonify({'tasks': tasks})

# start the server with the 'run()' method
if __name__ == '__main__':
#    initdb_command()
    db.reflect()
    db.drop_all()
    db.create_all()
    AK = State(count=1632,victims=973,name="Burglary/Breaking and Entering",per_population=23.5)
    db.session.add(AK)
    db.session.commit()
    print("Created db\n\n\n")
    app.run(host='0.0.0.0', port=5000)

