import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomTodoList from "@/components/CustomTodoList.vue";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "@/services/api.js";

// Mock the API module
jest.mock("@/services/api.js", () => ({
  getTodos: jest.fn(),
  addTodo: jest.fn(),
  toggleTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

describe("App.vue", () => {
  let wrapper;
  const mockTodos = [
    { _id: "1", title: "Test Todo 1", completed: false },
    { _id: "2", title: "Test Todo 2", completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    getTodos.mockResolvedValue({ data: mockTodos });
    addTodo.mockImplementation((todo) =>
      Promise.resolve({ data: { ...todo, _id: "3", completed: false } })
    );
    toggleTodo.mockImplementation((id, completed) =>
      Promise.resolve({ data: { _id: id, completed } })
    );
    deleteTodo.mockResolvedValue({});

    wrapper = mount(App);
  });

  it("renders correctly", () => {
    expect(wrapper.find(".app-title").text()).toBe("Todo App");
    expect(wrapper.findComponent(CustomInput).exists()).toBe(true);
    expect(wrapper.findComponent(CustomTodoList).exists()).toBe(true);
  });

  it("fetches todos on mount", async () => {
    expect(getTodos).toHaveBeenCalledTimes(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.todos).toEqual(mockTodos);
  });

  it("adds a new todo", async () => {
    wrapper.vm.newTodo = "New Test Todo";

    await wrapper.vm.addTodo();

    expect(addTodo).toHaveBeenCalledWith({ title: "New Test Todo" });
    expect(wrapper.vm.todos).toHaveLength(3);
    expect(wrapper.vm.newTodo).toBe("");
  });

  it("does not add empty todo", async () => {
    wrapper.vm.newTodo = "   ";
    await wrapper.vm.addTodo();
    expect(addTodo).not.toHaveBeenCalled();
    expect(wrapper.vm.todos).toEqual(mockTodos);
  });

  it("toggles todo completion", async () => {
    await wrapper.vm.toggleComplete("1");
    expect(toggleTodo).toHaveBeenCalledWith("1", true);
    expect(wrapper.vm.todos.find((t) => t._id === "1").completed).toBe(true);
  });

  it("deletes a todo", async () => {
    await wrapper.vm.removeTodo("2");
    expect(deleteTodo).toHaveBeenCalledWith("2");
  });

  it("handles API errors gracefully", async () => {
    getTodos.mockRejectedValueOnce(new Error("Network error"));
    console.error = jest.fn();

    await wrapper.vm.fetchTodos();
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching todos:",
      expect.any(Error)
    );
  });

  it("matches snapshot", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
