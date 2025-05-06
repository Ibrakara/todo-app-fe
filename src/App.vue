<template>
  <div id="app">
    <h1 class="app-title">Todo App</h1>
    <CustomInput />
  </div>
</template>

<script>
import CustomInput from "./components/CustomInput.vue";
export default {
  name: "App",
  components: { CustomInput },
  data() {
    return {
      newTodo: "",
      todos: [],
    };
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
