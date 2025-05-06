<template>
  <div class="add-todo-container">
    <input class="todo-input" v-model="newTodo" placeholder="Add a new todo" />
    <button class="add-todo-button" @click="addTodo">Add</button>
  </div>
</template>
<script>
export default {
  name: "CustomInput",
  data() {
    return {
      newTodo: "",
      todos: [],
    };
  },
};
</script>

<style scoped>
.add-todo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.todo-input {
  padding: 10px;
  font-size: 17px;
  border: none;
  outline: none;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
  max-width: 500px;
  transition: black 200ms ease-in-out;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  background-color: #1c1f2b;
  color: #fefefe;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.todo-input::placeholder {
  color: #cccccc;
  opacity: 0.8;
}
.add-todo-button {
  background-color: #1dd1a1cc;
  height: 40px;
  border: none;
  border-top-right-radius: 17px;
  border-bottom-right-radius: 17px;
  cursor: pointer;
  width: 50px;
  font-weight: 500;
  font-size: 17px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: background-color 200ms ease, transform 150ms ease;
}
.add-todo-button:hover {
  background-color: #1dd1a1;
  transform: scale(1.05);
}
.add-todo-button:active {
  transform: scale(0.95); /* Slightly shrink the button */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Reduce shadow for a pressed effect */
}
</style>
