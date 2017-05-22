import React from "react";
import PropTypes from "prop-types";
import Router from "./Router";
import createHistory from "mobx-history/createBrowserHistory";

export default class HashRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    keyLength: PropTypes.number,
    getUserConfirmation: PropTypes.func,
    children: PropTypes.node
  };
  
  history = createHistory(this.props);
  
  render() {
    return <Router history={this.history} children={this.props.children}/>
  }
}