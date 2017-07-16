import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import createMemoryHistory from "mobx-history/createMemoryHistory";
import Router from "../Router";
import NavLink from "../NavLink";

describe('<NavLink />', () => {
  let history = createMemoryHistory();
  window.h = history;
  let wrapper;
  let setWrapperChildren = (children) => wrapper = mount(<Router history={history} children={children}/>);
  beforeEach(() => {
    history.location = '/';
  });
  afterEach(() => {
    wrapper && wrapper.unmount();
  });
  
  it('activeClassName and activeStyle works', () => {
    setWrapperChildren(
      <NavLink to="/sub" className="link" activeClassName="active" style={{width: 10, height: 10}}
               activeStyle={{width: 100, color: 'red'}}>
        click me
      </NavLink>);
    expect(wrapper.html()).to.be.equal('<a class="link" href="/sub" style="width: 10px; height: 10px;">click me</a>');
    history.location = '/sub';
    expect(wrapper.html()).to.be.equal('<a class="link active" href="/sub" style="width: 100px; height: 10px; color: red;">click me</a>');
  });
});
