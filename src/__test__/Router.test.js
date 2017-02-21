import React from "react";
import {inject} from "mobx-react";
import {expect} from "chai";
import {mount} from "enzyme";
import Router from "../Router";
import createMemoryHistory from "mobx-history/createMemoryHistory";
import History from "mobx-history/History";
import proxyquire from "proxyquire";
import sinon from "sinon";


@inject('history', 'match')
class MockRoute extends React.Component {
  render() {
    this.props.check(this.props);
    return null;
  }
}

describe('<Router />', () => {
  it('should with a child', () => {
    expect(
      () => mount(<Router history={createMemoryHistory()}>
      </Router>)
    ).to.throw(/React.Children.only/);
  });
  it('mount ok', () => {
    expect(
      () => mount(<Router history={createMemoryHistory()}>
        <div />
      </Router>)
    ).to.not.throw();
  });
  it('set correct `history` and `match` in context', () => {
    let check = (props) => {
      
      let {history, match} = props;
      
      expect(history).to.be.instanceof(History);
      expect(match).to.have.property('path')
        .that.is.a('string');
      expect(match).to.have.property('url')
        .that.is.a('string');
      expect(match).to.have.property('params')
        .that.is.a('object');
    };
    expect(
      () => mount(<Router history={createMemoryHistory()}><MockRoute check={check}/></Router>)
    ).not.throw();
  });
  it('`history` can change', () => {
    let check = (props) => {
      
      let {history, match} = props;
      
      expect(history).to.be.instanceof(History);
      expect(match).to.have.property('path')
        .that.is.a('string');
      expect(match).to.have.property('url')
        .that.is.a('string');
      expect(match).to.have.property('params')
        .that.is.a('object');
    };
    expect(
      () => mount(<Router history={createMemoryHistory()}><MockRoute check={check}/></Router>)
    ).not.throw();
  });
});

describe('<MemoryRouter />', () => {
  let createHistoryMock;
  let MemoryRouter;
  let spy;
  beforeEach(() => {
    createHistoryMock = (props) => props;
    spy = sinon.spy(require('mobx-history').createMemoryHistory);
    // createHistoryMock.default
    MemoryRouter = proxyquire('../MemoryRouter', {'history/createMemoryHistory': {'default': spy}}).default;
  });
  
  it('mount ok', () => {
    let props = {
      initialEntries: ['/'],  // The initial URLs in the history stack
      initialIndex: 0,          // The starting index in the history stack
      keyLength: 6,             // The length of location.key
      // A function to use to confirm navigation with the user. Required
      // if you return string prompts from transition hooks (see below)
      getUserConfirmation: null
    };
    const wrapper = mount(<MemoryRouter {...props}>
      <div>1</div>
    </MemoryRouter>);
    // expect(wrapper.find(Router).prop('history')).to.be.eql(props);
    expect(spy.withArgs(props).calledOnce)
  });
});

describe('<HashRouter />', () => {
  let createHistoryMock;
  let HashRouter;
  let spy;
  beforeEach(() => {
    createHistoryMock = (props) => props;
    spy = sinon.spy(require('mobx-history').createHashHistory);
    // createHistoryMock.default
    HashRouter = proxyquire('../HashRouter', {'mobx-history/createHashHistory': {'default': spy}}).default;
  });
  
  it('mount ok', () => {
    let props = {
      basename: '',             // The base URL of the app (see below)
      hashType: 'slash',        // The hash type to use (see below)
      // A function to use to confirm navigation with the user (see below)
      getUserConfirmation: (message, callback) => callback(window.confirm(message))
    };
    const wrapper = mount(<HashRouter {...props}>
      <div>1</div>
    </HashRouter>);
    expect(spy.withArgs(props).calledOnce)
  });
});

describe('<BrowserRouter />', () => {
  let createHistoryMock;
  let BrowserRouter;
  let spy;
  beforeEach(() => {
    createHistoryMock = (props) => props;
    spy = sinon.spy(require('mobx-history').createBrowserHistory);
    // createHistoryMock.default
    BrowserRouter = proxyquire('../BrowserRouter', {'mobx-history/createBrowserHistory': {'default': spy}}).default;
  });
  
  it('mount ok', () => {
    let props = {
      basename: '',             // The base URL of the app (see below)
      forceRefresh: false,      // Set true to force full page refreshes
      keyLength: 6,             // The length of location.key
      // A function to use to confirm navigation with the user (see below)
      getUserConfirmation: (message, callback) => callback(window.confirm(message))
    };
    const wrapper = mount(<BrowserRouter {...props}>
      <div>1</div>
    </BrowserRouter>);
    // expect(wrapper.find(Router).prop('history')).to.be.eql(props);
    expect(spy.withArgs(props).calledOnce)
  });
});