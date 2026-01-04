# Faraday Server

Backend API for Faraday project using Node.js, Express, Sequelize, and PostgreSQL.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Database Configuration**:
    Create a `.env` file in the root of the `server` directory (or update the existing one) with your PostgreSQL credentials:
    ```env
    PORT=5000
    DB_NAME=faraday_db
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    ```
    *Note: You must create the database `faraday_db` in PostgreSQL before running the server.*

3.  **Run Server**:
    - Development (with nodemon):
      ```bash
      npm run dev
      ```
    - Production:
      ```bash
      npm start
      ```

## API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login user.
- `GET /api/auth/me`: Get current user info (Protected).

### Volunteers (CRUD)
- `POST /api/volunteers`: Create a volunteer.
- `GET /api/volunteers`: Get all volunteers (Protected).
- `GET /api/volunteers/:id`: Get volunteer by ID (Protected).
- `PUT /api/volunteers/:id`: Update volunteer (Protected).
- `DELETE /api/volunteers/:id`: Delete volunteer (Protected).
