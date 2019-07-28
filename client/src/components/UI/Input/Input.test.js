import { shallow } from "enzyme";
import React from "react";
import Input from "./Input";

it("expect to render Button component", () => {
  expect(shallow(<Input />)).toMatchSnapshot();
});
