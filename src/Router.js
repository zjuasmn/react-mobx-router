import React, {PropTypes} from 'react'
import invariant from 'invariant'
import {createHashHistory} from 'history'
import History from '../../models/History'
import {Provider} from 'mobx-react'
/**
 * The public API for putting history on context.router.
 */
export default class Router extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node
  }
  
  render() {
    const {children, history} = this.props;
    invariant(
      children == undefined || React.Children.count(children) === 1,
      'A <Router> may have only one child element'
    );
    
    return children ?
      <Provider history={history} >{React.Children.only(children)}</Provider> : null
  }
}

/**
 * The public API for a <Router> that uses window.location.hash.
 */
export class HashRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    getUserConfirmation: PropTypes.func,
    hashType: PropTypes.oneOf(['hashbang', 'noslash', 'slash']),
    children: PropTypes.node
  };
  
  history = new History(createHashHistory(this.props));
  
  render() {
    return <Router history={this.history} children={this.props.children}/>
  }
}