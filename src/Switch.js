import React, {PropTypes} from "react";
import {resolve, matchPath} from "./utils";
import {observer, inject} from "mobx-react";
import Redirect from './Redirect'
import Route from './Route'
import invariant from 'invariant'
const debug = require('debug')('react-mobx-router:Switch');
/**
 * The public API for rendering the first <Route> that matches.
 */
@inject('history', 'match')
@observer
export default class Switch extends React.Component {
  render() {
    debug('update:', this.props);
    const {children, history: {location: {pathname}}, match: {url}, ...props} = this.props;
    const routes = React.Children.toArray(children);
    let route, match;
    for (let i = 0, length = routes.length; i < length; ++i) {
      route = routes[i];
      if (route.type instanceof Route) {
        match = matchPath(pathname, resolve(url, route.props.path || ''), route.props);
      } else if (route.type instanceof Redirect) {
        match = matchPath(pathname, resolve(url, route.props.from || ''), route.props);
      } else{
        invariant(false,'Children of Switch must be Route or Redirect.');
      }
      if (match) {
        return React.cloneElement(route, {computedMatch: match, ...props});
      }
    }
    return null
  }
}