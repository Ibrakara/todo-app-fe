import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/todos",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = () => apiClient.get("/");

export const addTodo = (todo) => apiClient.post("/", todo);

export const toggleTodo = (id, completed) =>
  apiClient.put(`/${id}`, { completed });

export const deleteTodo = (id) => apiClient.delete(`/${id}`);
