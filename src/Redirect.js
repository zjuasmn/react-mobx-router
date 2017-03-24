import React, {Component, PropTypes} from 'react'
import {resolve, matchPath} from "./utils";
import {observer, inject} from "mobx-react";
const debug = require('debug')('react-mobx-route:Redirect');

@inject('history', 'match')
@observer
export default class Redirect extends Component {
  static propTypes = {
    push: PropTypes.bool,
    from: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    to: PropTypes.string.isRequired,
  };
  static defaultProps = {
    from: '/',
    exact: false,
    strict: false,
  };
  
  componentWillMount() {
    this.tryRedirect();
  }
  
  tryRedirect() {
    let {push, to, from, exact, strict, computedMatch, history: {location: {pathname}}, match: {url}} = this.props;
    let {history} = this.props;
    let match = computedMatch || matchPath(pathname, resolve(url, from), {exact, strict});
    if (match) {
      push ? history.push(resolve(url, to)) : history.replace(resolve(url, to));
    }
  }
  
  componentWillUpdate() {
    this.tryRedirect();
  }
  
  render() {
    let {push, to, from, exact, strict, computedMatch, history: {location: {pathname}}, match: {url}} = this.props;
    return null;
  }
}