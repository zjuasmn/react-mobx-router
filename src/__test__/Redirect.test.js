import React from "react";
import {render} from "react-dom";
import {expect} from "chai";
import {mount, shallow} from "enzyme";
import createMemoryHistory from "mobx-history/createMemoryHistory";
import Router from "../Router";
import Redirect from "../Redirect";


describe('<Redirect />', () => {
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
  it('should be a child of Router', () => {
    expect(
      () => shallow(<Redirect to="/a"/>)
    ).to.throw();
  });
  it('works!', () => {
    setWrapperChildren(<Redirect to="/a"/>);
    expect(history.location.pathname).to.be.eql('/a');
  });
  it('won\'t work when from is no match!', () => {
    setWrapperChildren(<Redirect from='/sub' to="/a"/>);
    expect(history.location.pathname).to.be.eql('/');
    history.location = '/sub';
    expect(history.location.pathname).to.be.eql('/a');
  });
  
});
