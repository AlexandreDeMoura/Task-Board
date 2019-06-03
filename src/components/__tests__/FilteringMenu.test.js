import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilteringMenu from "../FilteringMenu";

Enzyme.configure({ adapter: new Adapter() });

describe("FilteringMenu", () => {
  it("should show the menu options when clicked", () => {
    const wrapper = shallow(
      <FilteringMenu
        isDarkModeSelected={false}
        getFilteringMenuInput={() => 1}
      />
    );

    wrapper.find("div").simulate("click");

    expect(wrapper.exists(".filtering-menu__options-container")).toBeTruthy();
  });

  it("should close the menu options when clicked a second time", () => {
    const wrapper = shallow(
      <FilteringMenu
        isDarkModeSelected={false}
        getFilteringMenuInput={() => 1}
      />
    );

    wrapper
      .find("div")
      .simulate("click")
      .simulate("click");

    expect(wrapper.exists(".filtering-menu__options-container")).toBeFalsy();
  });

  it("should call handleOptionClick() with the parameter of the option that has been clicked", () => {
    const wrapper = shallow(
      <FilteringMenu
        isDarkModeSelected={false}
        getFilteringMenuInput={() => 1}
      />
    );

    const instance = wrapper.instance();
    spyOn(instance, "handleOptionClick");

    wrapper.find("div").simulate("click");
    wrapper
      .find(".filtering-menu__options-container p")
      .first()
      .simulate("click");

    expect(instance.handleOptionClick).toBeCalledWith("Urgency (ascending)");
  });

  it("should (close option's menu AND display clicked option's value) WHEN handleOptionClick() is triggered", () => {
    const wrapper = shallow(
      <FilteringMenu
        isDarkModeSelected={false}
        getFilteringMenuInput={() => 1}
      />
    );

    wrapper.find("div").simulate("click");
    wrapper
      .find(".filtering-menu__options-container p")
      .first()
      .simulate("click");

    expect(wrapper.exists(".filtering-menu__options-container")).toBeFalsy();
    expect(wrapper.find(".filtering-menu p").text()).toBe(
      "Urgency (ascending)"
    );
  });
});
