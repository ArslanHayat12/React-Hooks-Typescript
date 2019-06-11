import React from "react";
//import ReactDOM from 'react-dom';
import {PunkService} from "../src/services/PunkServices";
import { act } from "react-dom/test-utils";
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, mount } from "enzyme";
jest.useFakeTimers();

/* Test user observable behaviour */
describe("Punks", () => {
  it("should render a proper table data", done => {
    const mock = new MockAdapter(axios);
    mock
      .onGet("http://hn.algolia.com/api/v1/search?query=redux")
      .reply(200, {});
    const component = mount(<PunkService />);
    const div = component.find("div.ant-spin-container");
    //expect(div.children()).toHaveLength(0);
       console.log("=", div.debug());
    //   //expect(div.text()).toEqual('Hello, User!');
    setImmediate(() => {
      component.update();
      done();
    });
    act(() => {
      jest.runAllImmediates();
     // render(<Punks />);
    });
  });

  // let wrapper;

  // // it("should render", () => {
  // //   const wrapper = shallow(<Punks />);
  // //   expect(wrapper.exists()).toBeTruthy();
  // // });

  // it("should render with default name when not value not set in props", () => {
  //   console.log(result)
  //   // const mock = new MockAdapter(axios);
  //   // mock
  //   //   .onGet("http://hn.algolia.com/api/v1/search?query=redux")
  //   //   .reply(200, {});
  //   const wrapper = mount(<Punks />);
  //   // act(() => {
  //   //   jest.runAllImmediates();
  //   // });
  //   const div = wrapper.find("div.ant-spin-container").find("p");
  //   //expect(wrapper.find('ul.ant-list-items').children()).toHaveLength(4);
  //   console.log("=", div.debug());
  //   //expect(div.text()).toEqual('Hello, User!');
  // });
});
