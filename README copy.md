# Task Management API

A simple RESTful API for managing tasks, built with Express.js.

## Features

- Create, read, and delete tasks
- Simple web interface for task management
- RESTful API endpoints
- Error handling middleware
- Request logging
- Basic test suite

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd june13-api-session
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
NODE_ENV=development
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `DELETE /tasks/:id` - Delete a task

## Testing

Run the test suite:
```bash
npm test
```

## Project Structure

```
june13-api-session/
├── node_modules/
├── public/                  # Static front-end files
├── routes/                  # Express route handlers
├── controllers/            # Business logic
├── models/                 # Data models
├── middleware/             # Custom middleware
├── config/                 # Configuration files
├── tests/                  # Test suite
├── .env                    # Environment variables
├── package.json
└── server.js              # App entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 