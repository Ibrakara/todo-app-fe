import { mount } from "@vue/test-utils";
import CustomInput from "../../src/components/CustomInput.vue";

describe("CustomInput", () => {
  it("renders correctly", () => {
    const wrapper = mount(CustomInput);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Add");
  });

  it("emits input event when typing", async () => {
    const wrapper = mount(CustomInput);
    const input = wrapper.find("input");
    await input.setValue("New todo");
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(["New todo"]);
  });

  it("emits add event when button is clicked", async () => {
    const wrapper = mount(CustomInput);
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.emitted().add).toBeTruthy();
  });

  it("binds value prop to input value", () => {
    const testValue = "Test value";
    const wrapper = mount(CustomInput, {
      propsData: {
        value: testValue,
      },
    });
    const input = wrapper.find("input");
    expect(input.element.value).toBe(testValue);
  });

  it("has correct classes and structure", () => {
    const wrapper = mount(CustomInput);
    const container = wrapper.find(".add-todo-container");
    const input = wrapper.find(".todo-input");
    const button = wrapper.find(".add-todo-button");

    expect(container.exists()).toBe(true);
    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);

    expect(input.attributes("placeholder")).toBe("Add a new todo");
  });
});
