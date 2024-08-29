from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os
import logging
import traceback
import re

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

logging.basicConfig(filename='app.log', level=logging.ERROR)

load_dotenv()

# Get environment variables securely
MY_SECRET_KEY = os.environ.get('MY_SECRET_KEY')
if not MY_SECRET_KEY:
    raise ValueError("No MY_SECRET_KEY set for Flask app")

DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')

if not all([DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME]):
    raise ValueError("Database configuration is incomplete. Please set all required environment variables.")

db_config = {
    'user': DATABASE_USER,
    'password': DATABASE_PASSWORD,
    'host': DATABASE_HOST,
    'database': DATABASE_NAME,
    'connection_timeout': 10
}

def is_valid_email(email):
    """Validate email format using regex."""
    email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    return re.match(email_regex, email) is not None

@app.route('/api/patients', methods=['POST'])
def register_patient():
    cnx = None
    cursor = None
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()
        data = request.json

        # Log incoming data for debugging
        logging.info(f"Received data: {data}")

        # Ensure all expected keys are in the data
        required_keys = ['firstName', 'lastName', 'dob', 'gender', 'email', 'city', 'state', 'zip', 'emergencyContactName', 'emergencyContactPhone', 'relationship']
        if not all(key in data for key in required_keys):
            logging.error("Missing required patient information")
            return jsonify({'error': 'Missing required patient information'}), 400

        # Validate email format
        if not is_valid_email(data['email']):
            logging.error(f"Invalid email format: {data['email']}")
            return jsonify({'error': 'Invalid email format'}), 400

        # Check if email already exists
        check_email_sql = "SELECT COUNT(*) FROM patients WHERE email = %s"
        cursor.execute(check_email_sql, (data['email'],))
        email_count = cursor.fetchone()[0]

        if email_count > 0:
            logging.error(f"Email {data['email']} already exists")
            return jsonify({'error': 'Email already exists'}), 409

        # Extract values from the dictionary and create a list for parameters
        values = [data[key] for key in required_keys]

        sql = """INSERT INTO patients (firstName, lastName, dob, gender, email, city, state, zip, emergencyContactName, emergencyContactPhone, relationship)
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

        # Use parameterized queries with cursor.execute() to prevent SQL injection
        cursor.execute(sql, values)
        cnx.commit()
        
        return jsonify({'message': 'Patient registered successfully'}), 201

    except mysql.connector.Error as err:
        # Check if error is due to a duplicate entry (unique constraint violation)
        if err.errno == mysql.connector.errorcode.ER_DUP_ENTRY:
            logging.error(f"Duplicate entry error: {err}")
            return jsonify({'error': 'Email already exists'}), 409
        else:
            logging.error(f"Database error: {err}")
            logging.error(traceback.format_exc())  # Log the stack trace
            return jsonify({'error': 'A database error occurred'}), 500
    except Exception as e:
        logging.error(f"An error occurred during patient registration: {str(e)}")
        logging.error(traceback.format_exc())  # Log the stack trace
        return jsonify({'error': 'An error occurred during registration'}), 500
    finally:
        if cursor is not None:
            cursor.close()
        if cnx is not None:
            cnx.close()

@app.route("/api/patients", methods=['GET'])
def get_patients():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT * FROM patients")
        patients = cursor.fetchall()
        return jsonify(patients)
    except mysql.connector.Error as err:
        logging.error(f"Database connection failed: {err}")
        return jsonify({'error': 'Database connection failed'}), 500
    except Exception as e:
        logging.error(f"An error occurred during patient retrieval: {str(e)}")
        return jsonify({'error': 'An error occurred during patient retrieval'}), 500
    finally:
        if cursor is not None:
            cursor.close()
        if cnx is not None:
            cnx.close()

@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()
        data = request.json
        
        # Ensure all expected keys are in the data
        required_keys = ['name', 'appointmentDate', 'appointmentTime', 'department', 'doctor', 'reasonForVisit']
        if not all(key in data for key in required_keys):
            return jsonify({'error': 'Missing required appointment information'}), 400

        sql = """INSERT INTO appointments (name, appointment_date, appointment_time, department, doctor, reason_for_visit, insurance_provider, insurance_id, additional_notes)
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (
            data['name'], 
            data['appointmentDate'], 
            data['appointmentTime'], 
            data['department'], 
            data['doctor'], 
            data['reasonForVisit'], 
            data.get('insuranceProvider'), 
            data.get('insuranceId'), 
            data.get('additionalNotes')
        )
        
        cursor.execute(sql, values)
        cnx.commit()

        return jsonify({'message': 'Appointment scheduled successfully'}), 201
    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        logging.error(f"An error occurred while scheduling the appointment: {str(e)}")
        return jsonify({'error': 'An error occurred while scheduling the appointment'}), 500
    finally:
        if cursor is not None:
            cursor.close()
        if cnx is not None:
            cnx.close()

@app.route('/api/medical_records', methods=['GET', 'POST'])
def manage_medical_records():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)
        if request.method == 'POST':
            data = request.json

            required_keys = ['patientName', 'patientId', 'dateOfVisit', 'symptoms', 'medicalHistory', "diagnosis", "treatmentPlan"]
            if not all(key in data for key in required_keys):
                return jsonify({'error': 'Missing required medical record information'}), 400
            
            sql = """
            INSERT INTO medical_records (patient_name, patient_id, date_of_visit, symptoms, medical_history, diagnosis, treatment_plan)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                data['patientName'], 
                data['patientId'], 
                data['dateOfVisit'], 
                data['symptoms'],
                data.get('medicalHistory'),
                data.get('diagnosis'),
                data.get('treatmentPlan')
            )
            cursor.execute(sql, values)
            cnx.commit()

            return jsonify({'message': 'Medical record saved successfully'}), 201
        
        elif request.method == 'GET':
            cursor.execute("SELECT * FROM medical_records")
            medical_records = cursor.fetchall()
            return jsonify(medical_records)
        
    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        logging.error(f"An error occurred during medical record management: {str(e)}")
        return jsonify({'error': 'An error occurred during medical record management'}), 500
    finally:
        if cursor is not None:
            cursor.close()
        if cnx is not None:
            cnx.close()

if __name__ == '__main__':
    app.run(debug=True)
