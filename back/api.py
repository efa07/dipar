from flask import Flask, request, jsonify,session,make_response
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
from datetime import datetime
import os
import logging
import json
from cryptography.fernet import Fernet
import traceback
import re
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from argon2 import PasswordHasher
import argon2
from flask_session import Session
from functools import wraps
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)

CORS(app)

logging.basicConfig(filename='app.log', level=logging.DEBUG)

load_dotenv()

#argon2 setup
ph = PasswordHasher()

# Use a fixed encryption key for encryption and decryption
encryption_key = os.environ.get('ENCRYPTION_KEY') 
if encryption_key is None:
    encryption_key = Fernet.generate_key() 
cipher_suite = Fernet(encryption_key)

# Get environment variables
MY_SECRET_KEY = os.environ.get('MY_SECRET_KEY')
if not MY_SECRET_KEY:
    raise ValueError("No MY_SECRET_KEY set for Flask app")

DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')
app.secret_key = os.environ.get('App.secret_key')

# Configure the  JWT
app.config['JWT_SECRET_KEY'] = os.environ.get('App.secret_key')
jwt = JWTManager(app)

if not all([DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME]):
    raise ValueError("Database configuration is incomplete. Please set all required environment variables.")
# from .env
db_config = {
    'user': DATABASE_USER,
    'password': DATABASE_PASSWORD,
    'host': DATABASE_HOST,
    'database': DATABASE_NAME,
    'connection_timeout': 10
}

def is_valid_email(email):
    """
    Validate the format of an email address.

    This function uses a regular expression to check if the provided email address
    matches the standard email format.

    Args:
        email (str): The email address to validate.

    Returns:
        bool: True if the email address is valid, False otherwise.
    """
    """Validate email format using regex."""

    email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    return re.match(email_regex, email) is not None


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return jsonify({'error': 'Unauthorized access'}), 401
        return f(*args, **kwargs)
    return decorated_function

def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'role' not in session or session['role'] != role:
                return jsonify({'error': 'Access denied'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Extract data from the request
    first_name = data['firstName']
    last_name = data['lastName']
    age = data.get('age')
    email = data['email']
    password = data['password']
    role = data['role']

    # Perform validation
    if not is_valid_email(email):
        logging.error("Invalid email format.")
        return jsonify({'error': 'Invalid email format'}), 400

    # Hash the password using Argon2
    password_hash = ph.hash(password)

    # Encrypt the email
    encrypted_email = cipher_suite.encrypt(email.encode('utf-8'))

    cnx = None
    cursor = None
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        # Prepare SQL insert query
        insert_query = """
        INSERT INTO users (first_name, last_name, age, email, password_hash, role)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (first_name, last_name, age, encrypted_email, password_hash, role))

        # Commit the transaction
        cnx.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except mysql.connector.Error as err:
        logging.error(f"MySQL Error: {err}")
        return jsonify({'error': 'An error occurred while registering the user'}), 500

    finally:
        if cursor:
            cursor.close()
        if cnx:
            cnx.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    cnx = None
    cursor = None
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        query = "SELECT user_id, email, password_hash, role FROM users"
        cursor.execute(query)
        users = cursor.fetchall()

        # Decrypt and find a match for the provided email
        user = None
        for user_id, db_email, password_hash, role in users:
            decrypted_email = cipher_suite.decrypt(db_email).decode('utf-8')
            if decrypted_email == email:
                user = (user_id, password_hash, role)
                break

        if user:
            # password verification
            try:
                if ph.verify(user[1], password):
                    # Generate JWT token instead of using sessions
                    access_token = create_access_token(identity={'user_id': user[0], 'role': user[2]})
                    
                    return jsonify({
                        'message': 'Login successful',
                        'access_token': access_token,
                        'user_id': user[0],
                        'role': user[2]
                    }), 200
            except argon2.exceptions.VerifyMismatchError:
                logging.error(f"Password mismatch for email: {email}")
                return jsonify({'error': 'Invalid email or password'}), 401
        else:
            logging.error(f"Email not found or does not match: {email}")
            return jsonify({'error': 'Invalid email or password'}), 401

    except mysql.connector.Error as err:
        logging.error(f"MySQL Error: {err}")
        return jsonify({'error': 'An error occurred during login'}), 500

    finally:
        if cursor:
            cursor.close()
        if cnx:
            cnx.close()


@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    session.pop('role', None)
    return jsonify({'message': 'Logged out successfully'}), 200


@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    """Retrieve all users from the database."""
    current_user = get_jwt_identity()
    cnx = None
    cursor = None
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        # Correctly select user_id instead of id
        query = "SELECT user_id, first_name, last_name, age, email, role FROM users"
        cursor.execute(query)
        users = cursor.fetchall()

        # Prepare response data
        user_list = [
            {
                'user_id': user[0],
                'first_name': user[1],
                'last_name': user[2],
                'age': user[3],
                'email': cipher_suite.decrypt(user[4]).decode('utf-8'),  # Decrypt the email
                'role': user[5]
            }
            for user in users
        ]

        return jsonify(user_list), 200

    except mysql.connector.Error as err:
        # Log the detailed error for debugging
        logging.error(f"MySQL Error: {err}")
        # Return the error message for easier debugging
        return jsonify({'error': str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if cnx:
            cnx.close()


@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update a user's information by ID."""
    cnx = None
    cursor = None
    try:
        # Connect to the database
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        # Get the JSON data from the request
        data = request.json
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        age = data.get('age')
        email = data.get('email')
        role = data.get('role')

        # Validate required fields
        if not all([first_name, last_name, age, email, role]):
            return jsonify({'error': 'Missing fields'}), 400

        # Update user query
        query = """
        UPDATE users 
        SET first_name = %s, last_name = %s, age = %s, email = %s, role = %s
        WHERE user_id = %s
        """
        cursor.execute(query, (first_name, last_name, age, email, role, user_id))
        cnx.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'User not found'}), 404

        return jsonify({'message': 'User updated successfully'}), 200

    except mysql.connector.Error as err:
        logging.error(f"MySQL Error: {err}")
        return jsonify({'error': 'An error occurred while updating the user'}), 500

    finally:
        if cursor:
            cursor.close()
        if cnx:
            cnx.close()


@app.route('/api/patients', methods=['POST'])
def register_patient():

    cnx = None
    cursor = None
    
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()
        data = request.json

        logging.info(f"Received data: {data}")

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

        values = [data[key] for key in required_keys]

        sql = """INSERT INTO patients (firstName, lastName, dob, gender, email, city, state, zip, emergencyContactName, emergencyContactPhone, relationship)
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

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
    cursor = None
    cnx = None
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
        cursor.execute("SELECT id,name,appointment_date,reason_for_visit,additional_notes,status FROM appointments")
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

@app.route('/api/appointments/<int:id>/done', methods=['PUT'])
def mark_appointment_as_done(id):
    cursor = None
    cnx = None
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()
        cursor.execute("UPDATE appointments SET status = 'done' WHERE id = %s", (id,))
        cnx.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Appointment not found'}), 404
        
        return jsonify({'message': 'Appointment marked as done'}), 200
    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        logging.error(f"An error occurred while marking appointment as done: {str(e)}")
        return jsonify({'error': 'An error occurred while marking appointment as done'}), 500
    

# Cancel appointment (update status to canceled)
@app.route('/api/appointments/<int:id>/cancel', methods=['PUT'])
def cancel_appointment(id):
        cnx = None
        cursor = None
        try:
            cnx = mysql.connector.connect(**db_config)
            cursor = cnx.cursor()
            cursor.execute("UPDATE appointments SET status = %s WHERE id = %s", ('canceled', id))
            cnx.commit()

            if cursor.rowcount == 0:
                return jsonify({'error': 'Appointment not found'}), 404
            
            return jsonify({'message': 'Appointment canceled'}), 200
        except mysql.connector.Error as err:
            logging.error(f"Database error: {err}")
            return jsonify({'error': 'Database error occurred'}), 500
        except Exception as e:
            logging.error(f"An error occurred while canceling the appointment: {str(e)}")
            return jsonify({'error': 'An error occurred while canceling the appointment'}), 500
        finally:
            if cursor is not None:
                cursor.close()
            if cnx is not None:
                cnx.close()
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
    data = request.json  
    request_id = data.get('request_id')
    test_results = data.get('test_results', [])

    if not isinstance(request_id, int):
        return jsonify({"error": "Invalid request ID"}), 400

    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        for result in test_results:
            test_name = result.get('test_name')
            test_result = result.get('result')
            comments = result.get('comments', '')

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

@app.route('/api/lab_test_results', methods=['GET'])
def get_lab_test_results():
    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT * FROM lab_test_results")
        lab_result = cursor.fetchall()
        return jsonify(lab_result)
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


@app.route('/api/prescriptions', methods=['POST'])
def add_prescription():
    data = request.get_json()

    required_fields = ['date', 'medication', 'dosage', 'frequency', 'doctor_id', 'patient_id']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    cnx = None
    cursor = None

    try:
        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor()

        add_prescription_query = """
            INSERT INTO prescriptions (prescription_date, medication, dosage, frequency, prescribing_doctor, patient_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(add_prescription_query, (
            data['date'],
            data['medication'],
            data['dosage'],
            data['frequency'],
            data['doctor_id'],  
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
