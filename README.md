# todo-app-fe

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Backend Setup

Make sure you have the backend server running. Backend project repo: `https://github.com/Ibrakara/todo-app-be`

## Connecting Frontend with Backend

The frontend is configured to communicate with the backend API at `http://localhost:3000/api/todos`. Ensure the backend server is running before starting the frontend.

## API Endpoints

The frontend interacts with the following backend API endpoints:

- `GET /api/todos` - Fetch all todos.
- `POST /api/todos` - Add a new todo.
- `PUT /api/todos/:id` - Update a todo (e.g., toggle completion).
- `DELETE /api/todos/:id` - Delete a todo.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
