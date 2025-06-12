# Task Manager

A simple task manager web application using Node.js and Express. Tasks are stored in-memory and reset when the server restarts.

## Setup

Run the provided environment setup script which installs dependencies:

```bash
./setup_env.sh
```

## Running

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
npm test
```

## Endpoints

- `GET /api/tasks` – list tasks
- `POST /api/tasks` – add task with JSON body `{ "title": "Task" }`
- `DELETE /api/tasks/:id` – delete task by id
