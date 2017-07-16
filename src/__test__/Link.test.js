import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import createMemoryHistory from "mobx-history/createMemoryHistory";
import Router from "../Router";
import Link from "../Link";

describe('<Link />', () => {
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
  it('works', () => {
    setWrapperChildren(
      <Link to="/sub">
        a
      </Link>);
    expect(wrapper.html()).to.be.equal('<a href="/sub">a</a>');
    wrapper.find('a').simulate('click', {button: 0});
    expect(history.location.pathname).to.be.equal('/sub');
  });
  
  it('if `to` is undefined or null or empty string, do nothing', () => {
    setWrapperChildren(
      <div>
        <Link>undefined</Link>
        <Link to={null}>null</Link>
        <Link to=''/>
      </div>
    );
    expect(wrapper.html()).to.be.equal('<div><a href="javascript:">undefined</a><a href="javascript:">null</a><a href="javascript:"></a></div>');
  });
});
