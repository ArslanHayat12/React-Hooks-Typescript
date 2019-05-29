// import React from 'react';
// import ReactDOM from 'react-dom';
// import Tweets from './Tweets';
import { act } from "react-dom/test-utils";
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });
// import { mount,shallow } from 'enzyme';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// // it('renders without crashing', () => {
// //   const div = document.createElement('div');
// //   ReactDOM.render(<Tweets />, div);
// //   ReactDOM.unmountComponentAtNode(div);
// // });
// // it('should render correctly with no props', () => {
// //   const component = shallow(<Tweets/>);

// //   expect(component).toMatchSnapshot();
// // });
// // it('should render a proper table data', done => {
// //     const mock = new MockAdapter(axios);
// //     mock.onGet('http://hn.algolia.com/api/v1/search?query=redux').reply(200, {});
// //     const component = mount(<Tweets />);
// //     setImmediate(() => {
// //       component.update();
// //       console.log(component.debug());
// //       done();
// //     });
// //   });

//   test('SimpleComponent', done => {
//     const wrapper = mount(<Tweets/>);
//     setImmediate(done);
//   });

import React from "react";
import { shallow, mount } from "enzyme";
import Tweets from "./Tweets";
jest.useFakeTimers();

/* Test user observable behaviour */
describe("Tweets", () => {
  // it('should render a proper table data', done => {
  //   const mock = new MockAdapter(axios);
  //   mock.onGet('http://hn.algolia.com/api/v1/search?query=redux').reply(200, {});
  //   const component = mount(<Tweets />);
  //   setImmediate(() => {
  //     component.update();
  //    // console.log(component.debug());
  //     done();
  //   });
  //   act(() => {
  //     jest.runAllImmediates();
  //   });
  //   console.log(component.debug());
  //   // setImmediate(() => {
  //   //   component.update();
  //   //   console.log(component.debug());
  //   //   done();
  //   // });
  // });

  let wrapper;

  // it("should render", () => {
  //   const wrapper = shallow(<Tweets />);
  //   expect(wrapper.exists()).toBeTruthy();
  // });

  it("should render with default name when not value not set in props", () => {
    const mock = new MockAdapter(axios);
    mock
      .onGet("http://hn.algolia.com/api/v1/search?query=redux")
      .reply(200, {});
    const wrapper = mount(<Tweets />);
    act(() => {
      jest.runAllImmediates();
    });
    const div = wrapper.find("div.ant-spin-container").find("p");
    //expect(wrapper.find('ul.ant-list-items').children()).toHaveLength(4);
    console.log("=", div.debug());
    //expect(div.text()).toEqual('Hello, User!');
  });
});
