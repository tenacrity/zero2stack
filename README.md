✅ Backend Features
Express.js server setup with clean routing.

Sequelize ORM managing a relational database (likely MySQL or PostgreSQL) with migrations.

Session-based authentication using express-session (and optionally connect-session-sequelize).

Complete CRUD (Create, Read, Update, Delete) for API resources—e.g. users, tasks.

Organized folder structure:

routes/ – API route handlers

models/ – Sequelize models & migrations

config/ – DB connection & session setup

controllers/ – Server logic separate from route definitions

app.js or server.js – Entry point wiring everything together.

🔁 User Stories
User registration with stored credentials (hashed passwords).

Session login/logout flows.

Protected endpoints requiring authentication.

CRUD operations on app-specific resources (e.g. notes, tasks) accessible only to logged-in users.

🚀 Prerequisites
Node.js (v14+) and npm installed

Docker & Docker Compose, or a locally running MySQL/PostgreSQL

Optional: Postman or curl for testing your API

⚙️ Setup & Run
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/tenacrity/zero2stack.git
cd zero2stack
git checkout June15APINodeJSSession_with-DB
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure your environment
Copy .env.example → .env

Customize variables:

ini
Copy
Edit
DB_HOST=localhost
DB_PORT=3306
DB_NAME=zero2stack
DB_USER=root
DB_PASS=yourpassword
SESSION_SECRET=yourSecret
4. Start the database
With Docker:

bash
Copy
Edit
docker-compose up -d
Or ensure an external DB server is running with matching credentials.

5. Run migrations
bash
Copy
Edit
npx sequelize db:migrate
6. Launch the server
bash
Copy
Edit
npm run dev
Defaults to http://localhost:3000.

🎯 API Endpoints
POST /auth/register – Register a user

POST /auth/login – Login with credentials

POST /auth/logout – Logout (destroy session)

GET /api/tasks – List your tasks (auth required)

POST /api/tasks – Create a task

PATCH /api/tasks/:id – Update task status/text

DELETE /api/tasks/:id – Remove a task

(Note: exact endpoints depend on names in your routes/
