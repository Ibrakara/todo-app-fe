import { mount } from "@vue/test-utils";
import CustomTodoList from "../../src/components/CustomTodoList.vue";

describe("CustomTodoList", () => {
  const mockTodos = [
    { _id: "1", title: "First todo", completed: false },
    { _id: "2", title: "Second todo", completed: true },
  ];

  it("renders correctly with todos", () => {
    const wrapper = mount(CustomTodoList, {
      propsData: {
        todos: mockTodos,
      },
    });

    const todoItems = wrapper.findAll(".todo-item");
    expect(todoItems.length).toBe(mockTodos.length);

    expect(todoItems.at(0).text()).toContain("First todo");
    expect(todoItems.at(1).text()).toContain("Second todo");
  });

  it("renders correctly with empty todos", () => {
    const wrapper = mount(CustomTodoList, {
      propsData: {
        todos: [],
      },
    });
    expect(wrapper.findAll(".todo-item").length).toBe(0);
  });

  it("applies completed class for completed todos", () => {
    const wrapper = mount(CustomTodoList, {
      propsData: {
        todos: mockTodos,
      },
    });

    const todoItems = wrapper.findAll(".todo-item");
    expect(todoItems.at(0).classes()).not.toContain("completed");
    expect(todoItems.at(1).classes()).toContain("completed");
  });

  it("emits toggleComplete event when todo text is clicked", async () => {
    const wrapper = mount(CustomTodoList, {
      propsData: {
        todos: mockTodos,
      },
    });

    await wrapper.findAll(".todo-text").at(0).trigger("click");
    expect(wrapper.emitted().toggleComplete).toBeTruthy();
    expect(wrapper.emitted().toggleComplete[0]).toEqual(["1"]);
  });

  it("emits deleteTodo event when delete button is clicked", async () => {
    const wrapper = mount(CustomTodoList, {
      propsData: {
        todos: mockTodos,
      },
    });

    await wrapper.findAll(".delete-button").at(0).trigger("click");
    expect(wrapper.emitted().deleteTodo).toBeTruthy();
    expect(wrapper.emitted().deleteTodo[0]).toEqual(["1"]);
  });

  it("applies correct styling classes", () => {
    const wrapper = mount(CustomTodoList, {
      propsData: {
        todos: mockTodos,
      },
    });

    const completedTodo = wrapper.findAll(".todo-item").at(1);
    expect(completedTodo.find(".todo-text").classes()).toContain("completed");
    expect(completedTodo.classes()).toContain("completed");

    expect(wrapper.findAll(".delete-button").length).toBe(mockTodos.length);
  });

  it("matches snapshot", () => {
    const wrapper = mount(CustomTodoList, {
      propsData: {
        todos: mockTodos,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
