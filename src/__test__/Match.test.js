import React from "react";
import {render} from "react-dom";
import {expect} from "chai";
import {mount} from "enzyme";
import Match from "../Match";
import Router from "../Router";
import createMemoryHistory from "mobx-history/createMemoryHistory";

describe('<Match />', () => {
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
      () => mount(<Match />)
    ).to.throw();
  });
  it('will render all the time!', () => {
    let Gao = (props) => {
      let {match} = props;
      return <div>{match && match.url}</div>
    };
    setWrapperChildren(<div>
      <Match path="/sub" component={Gao}>
        
      </Match>
    </div>);
    expect(wrapper.html()).to.be.eql(`<div><div></div></div>`);
    history.location = '/sub';
    expect(wrapper.html()).to.be.eql(`<div><div>/sub</div></div>`);
  });
});
