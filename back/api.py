from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import secrets
import os
import logging

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Set up logging
logging.basicConfig(filename='app.log', level=logging.ERROR)

# Load environment variables
load_dotenv()

MY_SECRET_KEY = os.environ.get('MY_SECRET_KEY')
if not MY_SECRET_KEY:
    raise ValueError("No MY_SECRET_KEY set for Flask application")

DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')   

db_config = {
    'user': DATABASE_USER,
    'password': DATABASE_PASSWORD,
    'host': DATABASE_HOST,
    'database': DATABASE_NAME
}

@app.route('/api/patients', methods=['POST'])
def register_patient():
    try:
        cnx = mysql.connector.connect(**db_config)
    except mysql.connector.Error as err:
        logging.error(f"Database connection failed: {err}")
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = cnx.cursor()
        data = request.json

        # extract values from the dictionary and create a list for parameters
        values = list(data.values())

        sql = """INSERT INTO patients (firstName, lastName, dob, gender, email, city, state, zip, emergencyContactName, emergencyContactPhone, relationship)
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

        # use parameterized queries with cursor.execute()(to prevent SQL injection)
        cursor.execute(sql, values)
        cnx.commit()
        
        return jsonify({'message': 'Patient registered successfully'}), 201
    except Exception as e:
        logging.error(f"An error occurred during patient registration: {str(e)}")
        return jsonify({'error': 'An error occurred during registration'}), 500
    finally:
        cursor.close()
        cnx.close()

@app.route("/")
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
