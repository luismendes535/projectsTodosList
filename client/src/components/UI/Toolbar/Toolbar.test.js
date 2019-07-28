import { shallow } from "enzyme";
import React from "react";
import Toolbar from "./Toolbar";

it("expect to render Toolbar component with a NavLink if user is authenticated", () => {
  expect(shallow(<Toolbar isAuth={true} />)).toMatchSnapshot();
});

it("expect to render Toolbar component without any NavLink if user is not authenticated", () => {
  expect(shallow(<Toolbar isAuth={false} />)).toMatchSnapshot();
});
