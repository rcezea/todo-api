# Todo API

## Overview

This Todo API provides endpoints for user authentication and managing todo items. Built with Express.js, it includes functionality for user registration, login, and CRUD operations for todos. Authentication is managed via JWT-like tokens stored in Redis.

## Features

- **User Registration:** Register new users with email and password.
- **User Authentication:** Login to obtain an authentication token.
- **Todo Management:** Create, retrieve, update, and delete todo items.

## Requirements

- Node.js
- Redis server
- PostgreSQL

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rcezea/todo-api.git
   cd todo-api
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

#### Register a New User

- **Endpoint:** `POST /register`
- **Description:** Registers a new user with email and password.
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Responses:**
    - **201 Created:**

      ```json
      {
        "id": "user-id",
        "email": "user@example.com"
      }
      ```

    - **400 Bad Request:**

      ```json
      {
        "error": "User exists already"
      }
      ```

    - **500 Internal Server Error:**

      ```json
      {
        "error": "Internal Server Error"
      }
      ```

#### Authenticate User and Get Token

- **Endpoint:** `POST /connect`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Responses:**
    - **200 OK:**

      ```json
      {
        "token": "auth-token"
      }
      ```

    - **401 Unauthorized:**

      ```json
      {
        "error": "Unauthorized"
      }
      ```

    - **500 Internal Server Error:**

      ```json
      {
        "error": "Internal Server Error"
      }
      ```

#### Disconnect User (Logout)

- **Endpoint:** `DELETE /disconnect`
- **Description:** Logs out a user by invalidating their token.
- **Headers:**
    - `x-token: auth-token`

- **Responses:**
    - **204 No Content**
    - **401 Unauthorized:**

      ```json
      {
        "error": "Unauthorized"
      }
      ```

    - **500 Internal Server Error:**

      ```json
      {
        "error": "Internal Server Error"
      }
      ```

### Todo Operations

#### Get All Todos

- **Endpoint:** `GET /todos`
- **Description:** Retrieves all todo items for the authenticated user.
- **Headers:**
    - `x-token: auth-token`

- **Responses:**
    - **200 OK:**

      ```json
      {
        "tasks": [
          {
            "id": 1,
            "task": "Task description"
          }
        ]
      }
      ```

    - **401 Unauthorized:**

      ```json
      {
        "error": "Unauthorized"
      }
      ```

#### Create a New Todo

- **Endpoint:** `POST /todo`
- **Description:** Creates a new todo item for the authenticated user.
- **Headers:**
    - `x-token: auth-token`
- **Request Body:**

  ```json
  {
    "task": "New task description"
  }
  ```

- **Responses:**
    - **201 Created:**

      ```json
      {
        "message": "New task added"
      }
      ```

    - **401 Unauthorized:**

      ```json
      {
        "error": "Unauthorized"
      }
      ```

#### Update an Existing Todo

- **Endpoint:** `PUT /todo`
- **Description:** Updates an existing todo item.
- **Headers:**
    - `x-token: auth-token`
- **Request Body:**

  ```json
  {
    "task_id": 1,
    "task": "Updated task description"
  }
  ```

- **Responses:**
    - **200 OK:**

      ```json
      {
        "message": "Task updated"
      }
      ```

    - **400 Bad Request:**

      ```json
      {
        "error": "An error occurred"
      }
      ```

    - **401 Unauthorized:**

      ```json
      {
        "error": "Unauthorized"
      }
      ```

#### Delete a Todo

- **Endpoint:** `DELETE /todo`
- **Description:** Deletes a todo item.
- **Headers:**
    - `x-token: auth-token`
- **Request Body:**

  ```json
  {
    "task_id": 1
  }
  ```

- **Responses:**
    - **200 OK:**

      ```json
      {
        "message": "Task deleted"
      }
      ```

    - **400 Bad Request:**

      ```json
      {
        "error": "An error occurred"
      }
      ```

    - **401 Unauthorized:**

      ```json
      {
        "error": "Unauthorized"
      }
      ```

## Contributing

Contributions are welcome! Please submit issues and pull requests to the repository.


## Contact

For questions or feedback, please reach out via [Email](mailto:rcezea007@gmail.com)

---