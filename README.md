# Dipar - Digital patient recored

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description
Dipar is a comprehensive hospital management system designed to digitize and streamline hospital processes, allowing healthcare providers to manage patient data, lab results, and communication efficiently. The system aims to replace traditional paperwork with a secure, scalable digital solution.

## Features
- **User Roles**: Role-based access for doctors, nurses, lab staff, and receptionists.
- **Patient Management**: Comprehensive patient registration and data management.
- **Lab Test Management**: Request, input, and view test results.
- **Secure Communication**: Facilitates communication between healthcare providers and patients.
- **Data Security**: Implements strict data handling rules to ensure privacy and compliance.

## Technologies Used
- **Frontend**: React, Bootstrap, CSS
- **Backend**: Python, Flask
- **Database**: MySQL
- **Testing**: Chai for endpoint validation
- **Background Processing**: Bull for processing image uploads
- **Redis**: For caching and managing user sessions

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/dipar.git
    ```
2. Navigate to the project directory:
    ```bash
    cd dipar
    ```
3. Install the backend dependencies:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
4. Install the frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```
5. Set up the database:
    Follow the instructions in the `database/README.md` to set up the MySQL database.

6. Start the server:
    - For the backend:
        ```bash
        cd backend
        python app.py
        ```
    - For the frontend:
        ```bash
        cd frontend
        npm start
        ```

## Usage
Once the application is running, you can access the frontend at [http://localhost:5173](http://localhost:5173) and the backend API at [http://127.0.0.1:5000](http://127.0.0.1:5000). Log in using your credentials based on your user role to explore the system's features.

## API Endpoints
### User Management
- `POST /api/users`: Create a new user
- `POST /api/login`: User login

### Patient Management
- `GET /api/patients`: Retrieve all patients
- `POST /api/patients`: Add a new patient

### Lab Test Management
- `GET /api/lab_test_results`: Retrieve lab test results
- `POST /api/lab_test_results`: Submit test results

(Add more endpoints as necessary)

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Contact
For questions or feedback, please reach out to:
- ** Name**: efatariku07@gmail.com
- **GitHub**: [efa07](https://github.com/efa07)
