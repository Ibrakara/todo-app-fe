<template>
  <div class="todo-list">
    <div
      v-for="todo in todos"
      :key="todo._id"
      class="todo-item"
      :class="{ completed: todo.completed }"
    >
      <span
        :class="{ completed: todo.completed }"
        class="todo-text"
        @click="$emit('toggleComplete', todo._id)"
      >
        {{ todo.title }}
      </span>
      <button @click="$emit('deleteTodo', todo._id)" class="delete-button">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomTodoList",
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.todo-list {
  margin-top: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1f2b;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #fefefe;
  transition: background-color 200ms ease;
}
.todo-item.completed {
  background-color: #1dd1a1;
  color: #ffffffcc;
}
.todo-text {
  flex-grow: 1;
  text-align: left;
  color: #fefefe;
  cursor: pointer;
}
.todo-text.completed {
  text-decoration: line-through;
}
.delete-button {
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 200ms ease, transform 150ms ease;
}
.delete-button:hover {
  background-color: #ff4c4c;
  transform: scale(1.1);
}
.delete-button:active {
  transform: scale(0.95);
}
</style>
