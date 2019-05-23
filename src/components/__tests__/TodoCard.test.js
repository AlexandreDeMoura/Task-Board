import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoCard from "../TodoCard";

Enzyme.configure({ adapter: new Adapter() });

describe("TodoCard", () => {
  it("should show the right title, detail and emergency level corresponding with his props", () => {
    const data = {
      title: "Email fournisseur",
      emergencyLevel: "High",
      detail:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare tellus nec lacinia lacinia. Nunc porttitor fringilla cursus. Fusce semper convallis mauris nec dignissim. Vestibulum ac ligula euismod, volutpat felis at, iaculis enim. Ut quis."
    };
    const wrapper = shallow(
      <TodoCard
        data={data}
        deleteCard={() => {
          1;
        }}
      />
    );

    const title = wrapper.find("div h3");
    const detail = wrapper.find(".todo-card__todo-details");
    const emergencyLevel = wrapper.find(".todo-card__emergency-level");

    expect(title.text()).toBe(data.title);
    expect(detail.text()).toBe(data.detail);
    expect(emergencyLevel.text()).toBe(
      `Emergency level: ${data.emergencyLevel}`
    );
  });

  it("close button should come out when <TodoCard /> is hovered", () => {
    const wrapper = shallow(
      <TodoCard
        data={{}}
        deleteCard={() => {
          1;
        }}
      />
    );
    wrapper.simulate("mouseenter");
    expect(wrapper.exists(".light-circle")).toBeTruthy();
  });

  it("should call handleClickButton when the close button is clicked", () => {
    const wrapper = shallow(
      <TodoCard
        data={{}}
        deleteCard={() => {
          1;
        }}
      />
    );
    const instance = wrapper.instance();

    spyOn(instance, "handleClickButton");

    wrapper.simulate("mouseenter");
    wrapper.find(".light-circle").simulate("click");

    expect(instance.handleClickButton).toHaveBeenCalledTimes(1);
  });
});
