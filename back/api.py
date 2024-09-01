from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
from datetime import datetime
import os
import logging
import json
import traceback
import re

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

logging.basicConfig(filename='app.log', level=logging.DEBUG)

load_dotenv()

# Get environment variables
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

        logging.info(f"Received data: {data}")

        # Ensure all expected keys are in the data
        required_keys = ['firstName', 'lastName', 'dob', 'gender', 'email', 'city', 'state', 'zip', 'emergencyContactName', 'emergencyContactPhone', 'relationship']
        if not all(key in data for key in required_keys):
            logging.error("Missing required patient information")
            return jsonify({'error': 'Missing required patient information'}), 400

        if not is_valid_email(data['email']):
            logging.error(f"Invalid email format: {data['email']}")
            return jsonify({'error': 'Invalid email format'}), 400

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
        if err.errno == mysql.connector.errorcode.ER_DUP_ENTRY:
            logging.error(f"Duplicate entry error: {err}")
            return jsonify({'error': 'Email already exists'}), 409
        else:
            logging.error(f"Database error: {err}")
            logging.error(traceback.format_exc())
            return jsonify({'error': 'A database error occurred'}), 500
    except Exception as e:
        logging.error(f"An error occurred during patient registration: {str(e)}")
        logging.error(traceback.format_exc())
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

@app.route('/api/appointments', methods=['GET'])
def get_apppointments():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT id,name,appointment_date,reason_for_visit,additional_notes FROM appointments")
        appointments = cursor.fetchall()
        return jsonify(appointments)
    
    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        logging.error(f"An error occurred during geting appointments: {str(e)}")
        return jsonify({'error': 'An error occurred during fetching '}), 500
    finally:
        if cursor is not None:
            cursor.close()
        if cnx is not None:
            cnx.close()

@app.route('/api/appointments/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    try:
        # Establish the connection
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        # Execute the delete statement
        cursor.execute("DELETE FROM appointments WHERE id = %s", (id,))
        cnx.commit()

        # Check if any row was deleted
        if cursor.rowcount == 0:
            return jsonify({'message': 'Appointment not found'}), 404

        return jsonify({'message': 'Appointment deleted successfully'}), 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'error': 'An error occurred while deleting the appointment'}), 500

    finally:
        # Close the cursor and connection
        if 'cursor' in locals() and cursor is not None:
            cursor.close()
        if 'cnx' in locals() and cnx is not None:
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

@app.route('/api/lab_test_requests', methods=['POST'])
def create_lab_test_request():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)
        data = request.json

        patient_name = data.get('patient_name')
        patient_id = data.get('patient_id')
        selected_tests = json.dumps(data.get('selected_tests', []))
        notes = data.get('notes', '')

        app.logger.debug(f"Received data: {data}")

        if not patient_name or not patient_id:
            return jsonify({"error": "Patient name and ID are required."}), 400

        cursor.execute(
            """
            INSERT INTO Lab_Test_Requests (patient_id, patient_name, request_date, selected_tests, notes)
            VALUES (%s, %s, NOW(), %s, %s)
            """,
            (patient_id, patient_name, selected_tests, notes)
        )
        cnx.commit()

        return jsonify({"message": "Lab test request created successfully."}), 201

    except Exception as e:
        app.logger.error(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 400
    finally:
        if cnx.is_connected():
            cursor.close()
            cnx.close()


@app.route('/api/lab_test_requests', methods=['GET'])
def get_lab_test_requests():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)

        query = """
        SELECT request_id, patient_id, patient_name, selected_tests, notes, request_date
        FROM Lab_Test_Requests
        ORDER BY request_date DESC
        """
        cursor.execute(query)

        results = cursor.fetchall()

        # Format the data to match the frontend expectations
        formatted_results = []
        for row in results:
            formatted_row = {
                "request_id": row['request_id'],
                "patient_id": row['patient_id'],
                "patient_name": row['patient_name'],
                "selected_tests": row['selected_tests'],  # Keep as JSON string
                "notes": row['notes'],
                "request_date": row['request_date'].isoformat() if isinstance(row['request_date'], datetime) else row['request_date']
            }
            formatted_results.append(formatted_row)

        return jsonify(formatted_results), 200

    except Exception as e:
        app.logger.error(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 400
    finally:
        if cnx.is_connected():
            cursor.close()
            cnx.close()

@app.route('/api/lab_test_results', methods=['POST'])
def submit_lab_test_results():
    data = request.json  # Get the JSON data sent from the frontend
    request_id = data.get('request_id')
    test_results = data.get('test_results', [])

    if not isinstance(request_id, int):
        return jsonify({"error": "Invalid request ID"}), 400

    try:
        # Connect to the MySQL database
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        # Insert each test result into the database
        for result in test_results:
            test_name = result.get('test_name')
            test_result = result.get('result')
            comments = result.get('comments', '')

            # Insert statement for the test result
            insert_query = """
                INSERT INTO lab_test_results (request_id, test_name, result, comments)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_query, (request_id, test_name, test_result, comments))

        cnx.commit()

        return jsonify({"message": "Lab test results submitted successfully"}), 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database error occurred"}), 500

    finally:
        cursor.close()
        cnx.close()


@app.route('/api/prescriptions', methods=['POST'])
def add_prescription():
    data = request.get_json()

    # Validate the data
    required_fields = ['date', 'medication', 'dosage', 'frequency', 'doctor_id', 'patient_id']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    cnx = None
    cursor = None

    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        # SQL query to insert a new prescription
        add_prescription_query = """
            INSERT INTO prescriptions (prescription_date, medication, dosage, frequency, prescribing_doctor, patient_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(add_prescription_query, (
            data['date'],
            data['medication'],
            data['dosage'],
            data['frequency'],
            data['doctor_id'],  # This will be the doctor's name from the frontend
            data['patient_id']
        ))
        cnx.commit()

        return jsonify({'message': 'Prescription added successfully'}), 201

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        logging.error(f"An error occurred during data insertion: {str(e)}")
        return jsonify({'error': 'An error occurred during data insertion'}), 500
    finally:
        if cursor:
            cursor.close()
        if cnx:
            cnx.close()

@app.route('/api/prescriptions', methods=['GET'])
def get_prescription():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT * FROM prescriptions")
        prescriptions = cursor.fetchall()
        return jsonify(prescriptions)
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

if __name__ == '__main__':
    app.run(debug=True)
