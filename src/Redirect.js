import React, {Component, PropTypes} from 'react'
import {resolve, matchPath} from "./utils";
import {observer, inject} from "mobx-react";
const debug = require('debug')('react-mobx-route:Redirect');

@inject('history', 'match')
@observer
export default class Redirect extends Component {
  static propTypes = {
    
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
  tryRedirect(){
    let {to, from, exact, strict, history:{location:{pathname}}, match:{url}} = this.props;
    let {history} = this.props;
    let match = matchPath(pathname, resolve(url, from), {exact, strict});
    if (match) {
      history.location = resolve(url, to);
    }
  }
  componentWillUpdate(){
    this.tryRedirect();
  }
  render() {
    let {to, from, exact, strict, history:{location:{pathname}}, match:{url}} = this.props;
    return null;
  }
}