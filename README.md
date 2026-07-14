# TaskFlow - Task Manager App

A full-stack task management application built with React, Vite, Express.js, and Node.js.

Users can create, edit, delete, filter, and complete tasks. Tasks are displayed in a continuously animated endless carousel built without external carousel libraries.

## Features

- Create tasks with a title, description, and priority
- Edit existing tasks
- Delete tasks with confirmation
- Mark tasks as completed or pending
- Filter tasks by All, Completed, or Pending
- Visual indication for low, medium, and high priorities
- Endless animated task carousel
- Loading and error states
- Responsive design
- Client-side and server-side validation

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Regular CSS
- Fetch API

### Backend

- Node.js
- Express.js
- CORS
- In-memory data storage

## Requirements

- Node.js 20.19 or newer
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/orhadad3/or_hadad_helfy_task
cd or_hadad_helfy_task
```

## Backend Setup

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

The backend runs at:

```text
http://localhost:4000
```

The data is stored in memory and resets whenever the backend server restarts.

## Frontend Setup

Open a second terminal and run:

```bash
cd frontend
npm install
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

The frontend uses the following API URL by default:

```text
http://localhost:4000/api/tasks
```

A different API URL can be provided with the `VITE_API_URL` environment variable.

## Task Model

```js
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: "low" | "medium" | "high"
}
```

## API Endpoints

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | `/api/tasks` | Get all tasks | `200 OK` |
| POST | `/api/tasks` | Create a task | `201 Created` |
| PUT | `/api/tasks/:id` | Update a task | `200 OK` |
| DELETE | `/api/tasks/:id` | Delete a task | `204 No Content` |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion | `200 OK` |

### Create a Task

```http
POST /api/tasks
Content-Type: application/json
```

Example request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish and test the Task Manager application",
  "priority": "high"
}
```

The server creates the `id`, `completed`, and `createdAt` fields.

### Update a Task

```http
PUT /api/tasks/:id
Content-Type: application/json
```

Example request body:

```json
{
  "title": "Complete full assignment",
  "description": "Finish testing and submit the project",
  "priority": "medium"
}
```

### Error Responses

The API returns meaningful HTTP status codes:

- `400 Bad Request` for invalid task data or an invalid ID
- `404 Not Found` when a task or route does not exist
- `500 Internal Server Error` for unexpected server errors

Example:

```json
{
  "error": "Task not found"
}
```

## Carousel Implementation

The endless carousel was implemented with React and regular CSS without an external carousel library.

It works by rendering two matching groups of tasks and moving the carousel track with a continuous CSS transform animation. When the first group leaves the visible area, the second group continues from the same position, creating a seamless loop.

The animation:

- Runs continuously with smooth linear movement
- Adjusts its duration based on the number of tasks
- Pauses when the user hovers over it or focuses on a task
- Allows actions on tasks in both rendered groups
- Supports users who prefer reduced motion
- Handles empty lists and single-task lists

## Design Decisions

- Tasks are stored in memory because the assignment does not require a database.
- Vite is used as the React build tool.
- Task completion has a dedicated toggle endpoint.
- The server creates IDs and creation dates.
- Both frontend and backend validate task input.
- The browser confirmation dialog is used before deleting a task.
- The UI uses regular responsive CSS without frameworks or CSS-in-JS.
- Optional bonus features were not added so development could focus on the required functionality.

## Project Structure

```text
task-manager/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Time Spent

Approximate development time:

- Backend API: 1.5 hours
- Frontend functionality: 1.5 hours
- Carousel and responsive styling: 45 minutes
- Testing and documentation: 15 minutes

Total: approximately 4 hours