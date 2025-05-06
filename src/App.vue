<template>
  <div id="app">
    <h1 class="app-title">Todo App</h1>
    <CustomInput v-model="newTodo" @add="addTodo" />
    <CustomTodoList
      :todos="this.todos"
      @toggleComplete="toggleComplete"
      @deleteTodo="removeTodo"
    />
  </div>
</template>

<script>
import { getTodos, addTodo, toggleTodo, deleteTodo } from "@/services/api.js";
import CustomInput from "./components/CustomInput.vue";
import CustomTodoList from "./components/CustomTodoList.vue";
export default {
  name: "App",
  components: { CustomInput, CustomTodoList },
  data() {
    return {
      newTodo: "",
      todos: [],
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await getTodos();
        this.todos = response.data;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async addTodo() {
      if (this.newTodo.trim()) {
        try {
          const response = await addTodo({ title: this.newTodo });
          this.todos.push(response.data);
          this.newTodo = "";
        } catch (error) {
          console.error("Error adding todo:", error);
        }
      }
    },
    async toggleComplete(todoId) {
      const todo = this.todos.find((todo) => todo._id === todoId);
      try {
        const response = await toggleTodo(todoId, !todo.completed);
        this.todos = this.todos.map((todo) =>
          todo._id === todoId
            ? { ...todo, completed: response.data.completed }
            : todo
        );
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    },
    async removeTodo(todoId) {
      console.log("Deleting todo with ID:", todoId);
      try {
        await deleteTodo(todoId);
        this.todos = this.todos.filter((todo) => todo._id !== todoId);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
  },
  async mounted() {
    await this.fetchTodos();
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: linear-gradient(130deg, #6a11cb, #2575fc);
  color: #fefefe;
}
.app-title {
  color: #ffffffcc;
  text-shadow: 2px 2px 2px #0008;
}
</style>
