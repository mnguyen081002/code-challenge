# Todo API

A RESTful API for managing todos built with Node.js, Express, TypeScript and PostgreSQL.

## Features

- Create, read, update and delete todos
- Filter todos by title and completion status
- Pagination and sorting support
- Input validation using class-validator
- PostgreSQL database with TypeORM
- API documentation with Swagger/OpenAPI
- Error handling middleware
- Request logging with Morgan
- Rate limiting
- Docker support

## Prerequisites

- Node.js (v16+)
- PostgreSQL
- Docker (optional)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```
3. Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

## Running the app

### Development
```bash
npm run dev
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/v1/docs
```

## API Endpoints

### Todos
- `POST /v1/todos` - Create a new todo
- `GET /v1/todos` - Get all todos (with filtering & pagination)
- `GET /v1/todos/:id` - Get a specific todo
- `PATCH /v1/todos/:id` - Update a todo
- `DELETE /v1/todos/:id` - Delete a todo

## Environment Variables

```
NODE_ENV=development
PORT=3000

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

## Project Structure

```
src/
  ├── config/         # App configuration
  ├── controllers/    # Route controllers
  ├── docs/          # Swagger documentation
  ├── dtos/          # Data transfer objects
  ├── entities/      # TypeORM entities
  ├── middlewares/   # Custom middleware
  ├── routes/        # Route definitions
  ├── services/      # Business logic
  ├── types/         # TypeScript types
  ├── utils/         # Utility functions
  ├── app.ts         # Express app
  └── index.ts       # App entry point
```