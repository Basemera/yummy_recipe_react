import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount } from "enzyme";
import AddCategory from "../../components/categories/addCategory";

const setUp = category_name => {
  const props = {
    category_name,
    handleInputChange: () => {},
    onClick: () => {}
  };
  return shallow(<AddCategory {...props} />);
};

describe("Test Add category component creates a category", () => {
  const event = {
    target: {
      category_name: ""
    },
    preventDefault: () => {}
  };
  // const wrapper = shallow( <AddCategory/> );
  const wrapper = setUp("lunch");
  it("has category name field", () => {
    const input = wrapper.find("input").at(0);
    expect(input.props().name).toEqual("category_name");
    expect(input.props().required).toEqual(true);
  });

  it("input should respond to change event and change the state", () => {
    wrapper
      .find("#categoryName")
      .simulate("change", {
        target: { name: "category_name", value: "lunch" }
      });
    expect(wrapper.state("category_name")).toEqual("lunch");
  });

  it("submit button", () => {
    const input = wrapper.find("button").at(0);
    expect(input.props().type).toEqual("submit");
  });

  it("Form exists", () => {
    const input = wrapper.find("form").at(0);
    expect(input.props().name).toEqual("add-category");
    expect(input.simulate("click"));
  });

  it("handles submit", () => {
    const wrapper = mount(<AddCategory />);
    wrapper.instance().onClick(event);
  });
});
