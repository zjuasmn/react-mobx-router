import React, {PropTypes} from 'react'
import Router from './Router'
import createHistory from 'mobx-history/createMemoryHistory'

export default class HashRouter extends React.Component {
  static propTypes = {
    initialEntries: PropTypes.arrayOf(PropTypes.string),
    initialIndex: PropTypes.number,
    keyLength: PropTypes.number,
    getUserConfirmation: PropTypes.func,
    children: PropTypes.node
  };
  
  history = createHistory(this.props);
  
  render() {
    return <Router history={this.history} children={this.props.children}/>
  }
}