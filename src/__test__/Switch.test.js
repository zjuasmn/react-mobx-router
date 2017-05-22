import React from "react";
import {expect} from "chai";
import {mount, shallow} from "enzyme";
import createMemoryHistory from "mobx-history/createMemoryHistory";
import Router from "../Router";
import Route from "../Route";
import Switch from "../Switch";
import Redirect from "../Redirect";

describe('<Switch />', () => {
  let history;
  window.h = history;
  let wrapper;
  let setWrapperChildren = (children) => wrapper = mount(<Router history={history} children={children}/>);
  beforeEach(() => {
    history = createMemoryHistory();
    history.location = '/';
  });
  afterEach(() => {
    wrapper && wrapper.unmount();
  });
  it('should be a child of Router', () => {
    expect(
      () => shallow(<Switch />)
    ).to.throw();
  });
  
  it('Children of Switch must be Route or Redirect.', () => {
    expect(() =>
      setWrapperChildren(<Switch>
        <div>1</div>
      </Switch>)).to.throw('Children of Switch must be Route or Redirect.');
  });
  
  it('works', () => {
    setWrapperChildren(<Switch>
      <Route exact path="a">
        <div>a</div>
      </Route>
      <Redirect to='./a' from='b'/>
      <Route exact path=':id'>
        <div>c</div>
      </Route>
    </Switch>);
    history.location = '/a';
    expect(wrapper.html()).to.be.equal('<div>a</div>');
    history.location = '/b';
    expect(wrapper.html()).to.be.equal('<div>a</div>');
    history.location = '/xxx';
    expect(wrapper.html()).to.be.equal('<div id="xxx">c</div>');
    history.location = '/xxx/111';
    expect(wrapper.html()).to.be.equal(null);
  });
});
