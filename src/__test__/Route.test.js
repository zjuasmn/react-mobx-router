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


// @inject('history')
// @observer
// class Gao extends React.Component {
//   render() {
//     console.log(this.props.history.location.pathname);
//
//     return this.props.children;
//   }
// }
// render(<Router history={history}><Route path="/sub"><p>123</p></Route></Router>, document.getElementById('root'));


describe('<Route />', () => {
  let history = createMemoryHistory();
  window.h = history
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
      () => shallow(<Route />)
    ).to.throw();
  });
  it('can be nested!', () => {
    setWrapperChildren(<Route path="/sub">
      <div>
        <div>sub</div>
        <Route path='/sub/1'>
          <div>1</div>
        </Route>
      </div>
    </Route>);
    history.location = '/sub';
    
    // expect(wrapper.contains(<div><div>sub</div></div>)).to.be.true;
    history.location = '/sub/1';
    expect(wrapper.html()).to.be.eql(`<div><div>sub</div><div>1</div></div>`);
  });
  it('can be nested with relative path', () => {
    setWrapperChildren(<Route path="/sub">
      <div>
        <div>sub</div>
        <Route path='1'>
          <div>1</div>
        </Route>
        <Route path=':id'>
          <div>id
          <Route path={'../2'}>
            <span>2</span>
          </Route>
          </div>
        </Route>
      </div>
    </Route>);
    history.location = '/sub';
    expect(wrapper.html()).to.be.equal('<div><div>sub</div><!-- react-empty: 4 --><!-- react-empty: 5 --></div>');
  });
  it('sets params to children',()=>{
    setWrapperChildren(<Route path="/sub/:id" component="div">
    </Route>);
    history.location = '/sub/1';
    expect(wrapper.html()).to.be.equal('<div id="1"></div>');
  });
  describe('path', () => {
    it('should render children component when path is match as prefix', () => {
      setWrapperChildren(<Route path="/sub">
        <div>sub</div>
      </Route>);
      
      history.location = '/sub';
      // console.log(history.location.pathname, wrapper.debug());
      expect(wrapper.contains(<div>sub</div>)).to.be.eql(true);
      history.location = '/sub/2';
      expect(wrapper.contains(<div>sub</div>)).to.be.eql(true);
      history.location = '/other';
      expect(wrapper.contains(<div>sub</div>)).to.be.eql(false);
    });
    
    it('should always render when path is not set', () => {
      setWrapperChildren(<Route>
        <div>sub</div>
      </Route>);
      
      history.location = '/sub';
      expect(wrapper.contains(<div>sub</div>)).to.be.true;
      history.location = '/other';
      expect(wrapper.contains(<div>sub</div>)).to.be.true;
    });
    
    it('path with `exact` would only render when exact match', () => {
      setWrapperChildren(<Route exact path='/sub'>
        <div>sub</div>
      </Route>);
      
      history.location = '/sub';
      expect(wrapper.contains(<div>sub</div>)).to.be.true;
      history.location = '/sub/1';
      expect(wrapper.contains(<div>sub</div>)).to.be.false;
    });
  });
});
