import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserInput from "../UserInput";

Enzyme.configure({ adapter: new Adapter() });

describe("UserInput", () => {
  it("should display the form when title's field is clicked", () => {
    const wrapper = shallow(<UserInput />);

    wrapper.find(".user-input input").simulate("click");

    expect(wrapper.exists(".user-input__details-container")).toBeTruthy();
  });

  it("should remove the form when cancel button is clicked", () => {
    const wrapper = shallow(<UserInput />);

    wrapper.find(".user-input input").simulate("click");
    wrapper.find(".user-input__cancel-button").simulate("click");

    expect(wrapper.exists(".user-input__details-container")).toBeFalsy();
  });

  it("should NOT remove the form when create button is clicked IF title and emergency fields are NOT filled", () => {
    const wrapper = shallow(<UserInput />);

    wrapper.find(".user-input input").simulate("click");
    wrapper
      .find(".user-input__buttons-container button")
      .at(1)
      .simulate("click");

    expect(wrapper.exists(".user-input__button-off")).toBeTruthy();
  });

  it("should change an emergency-level className from 'color' to 'color-lock' when this emergency level is clicked", () => {
    const wrapper = shallow(<UserInput />);

    wrapper.find(".user-input input").simulate("click");

    expect(
      wrapper
        .find("li")
        .first()
        .hasClass("green")
    ).toBeTruthy();

    wrapper
      .find("li")
      .first()
      .simulate("click");

    expect(
      wrapper
        .find("li")
        .first()
        .hasClass("green-lock")
    ).toBeTruthy();

    expect(
      wrapper
        .find("li")
        .first()
        .hasClass("green")
    ).toBeFalsy();
  });

  it("should change an emergency-level className from 'color-lock' to 'color' when ANOTHER emergency-level has been clicked", () => {
    const wrapper = shallow(<UserInput />);

    wrapper.find(".user-input input").simulate("click");

    wrapper
      .find("li")
      .at(0)
      .simulate("click");

    expect(
      wrapper
        .find("li")
        .at(0)
        .hasClass("green-lock")
    ).toBeTruthy();

    wrapper
      .find("li")
      .at(1)
      .simulate("click");

    expect(
      wrapper
        .find("li")
        .at(0)
        .hasClass("green")
    ).toBeTruthy();
    expect(
      wrapper
        .find("li")
        .at(1)
        .hasClass("yellow-lock")
    ).toBeTruthy();
  });
});
