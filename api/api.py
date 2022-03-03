from inspect import _void
import time
from flask import Flask
from flask import request
import sqlite3

database = 'students.db'
recreateDB = False #if set to true will recreate database to original on Flask restart

def db_command(command):
    connection = sqlite3.connect(database)
    crsr = connection.cursor()
    crsr.execute(command)
    connection.commit()
    connection.close() 
    return crsr

# initiates database
if recreateDB:
    db_command("DROP TABLE students")
    sql_init = """CREATE TABLE students (
        name VARCHAR(40),
        id INTEGER,
        points INTEGER);"""
    db_command(sql_init)
    db_command("""INSERT INTO students VALUES ("Steve Smith", 211, 80);""")
    db_command("""INSERT INTO students VALUES ("Jian Wong", 122, 92);""")
    db_command("""INSERT INTO students VALUES ("Chris Peterson", 213, 91);""")
    db_command("""INSERT INTO students VALUES ("Sai Patel", 524, 94);""")
    db_command("""INSERT INTO students VALUES ("Andrew Whitehead", 425, 99);""")
    db_command("""INSERT INTO students VALUES ("Lynn Roberts", 626, 90);""")
    db_command("""INSERT INTO students VALUES ("Robert Sanders", 287, 75);""")

app = Flask(__name__)

# adds a new data
@app.route('/add', methods=['POST'])
def add_data():
    # gets data
    name = request.json['name']
    id = request.json['id']
    points = request.json['points']

    # adds it to the database
    db_command("INSERT INTO students VALUES (\"" + name + "\"," + str(id) + "," + str(points) + ");")

    return '200', 200

# removes with id
@app.route('/remove', methods=['POST'])
def remove_data():
    # Gets id
    id = request.json['id']
    
    # removes from database
    db_command("DELETE FROM students WHERE id=" + str(id) + ";")

    return '200', 200

@app.route('/update', methods=['POST'])
def update_data():
    # gets data
    newname = request.json['newname']
    newid = request.json['newid']
    newpoints = request.json['newpoints']
    oldid = request.json['oldid']

    # updates the database
    db_command("UPDATE students SET name= \"" + newname + "\", id= " + str(newid) + ",points= " + str(newpoints) + " WHERE id=" + str(oldid) +";")
    return '200', 200

# gives entire table
@app.route('/data')
def send_data():
    connection = sqlite3.connect(database)
    crsr = connection.cursor()
    crsr.execute("SELECT * FROM students")
    jsons = []
    for row in crsr:
        jsons.append("{\"name\":\"" + row[0] + "\", \"id\":" + str(row[1]) + ", \"points\":" + str(row[2]) + "}")
    connection.commit()
    connection.close() 
    data = "{\"rows\":["
    for i in jsons:
        data = data + i + ","
    if (len(data) == 9):
        data = data + "]}"
    else:
        data = data[:-1] + "]}"
    return data