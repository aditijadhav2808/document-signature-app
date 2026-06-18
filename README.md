# Document Signature App

## Overview

Document Signature App is a full-stack web application built using FastAPI and React. The application allows users to upload PDF documents, place signatures, manage approval workflows, and generate signed PDF files. It demonstrates secure authentication, file management, PDF processing, and frontend-backend integration.

## Features

* User Registration and Login
* Secure Password Hashing with Bcrypt
* JWT-Based Authentication
* PDF Upload and Storage
* PDF Preview in Browser
* Signature Placement and Management
* Signature Approval and Rejection Workflow
* Generate Signed PDF Documents
* Audit Log Tracking
* SQLite Database Integration
* REST API Architecture

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* JWT Authentication
* Bcrypt
* PyMuPDF

### Frontend

* React
* Vite
* JavaScript
* CSS

## Installation

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Project Structure

```text
document-signature-app/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── auth.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
└── README.md
```

## Application Workflow

1. Register a new user account
2. Login using credentials
3. Upload a PDF document
4. Preview the uploaded PDF
5. Add signature details
6. Approve or reject signatures
7. Generate a signed PDF document
8. Download or view the signed PDF

## Future Enhancements

* Email Notifications
* Public Signing Links
* Cloud Storage Integration
* Multi-User Signing Workflow
* Digital Signature Certificates
* Deployment on Cloud Platforms

## Author

**Aditi Jadhav**

AI & ML Diploma Student

## GitHub Repository

Document Signature App built using FastAPI and React.
