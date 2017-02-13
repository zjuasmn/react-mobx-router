import React from "react";
import {render} from 'react-dom'
import {inject, observer} from "mobx-react";
import {expect} from "chai";
import {mount, shallow} from "enzyme";
import createMemoryHistory from 'mobx-history/createMemoryHistory'
import Router from "../Router";
import Route from "../Route"
// import proxyquire from "proxyquire";
// import sinon from 'sinon';


@inject('history')
@observer
class Gao extends React.Component {
  render() {
    console.log(this.props.history.location.pathname);
    
    return this.props.children;
  }
}

describe('<Route />', () => {
  it('should be a child of Router', () => {
    expect(
      () => shallow(<Route />)
    ).to.throw();
  });
  it('should be a child of Router', () => {
    let history = createMemoryHistory();
    // let wrapper = mount(<Router history={history}><Route path="/sub"><div>123</div></Route></Router>);
    render(<Router history={history}><Route path="/sub"><p>123</p></Route></Router>, document.getElementById('root'));
    history.location = '/sub';
    history.location = '/sub2';
    window.h = history;
    // console.log(wrapper.debug());
  });
});
