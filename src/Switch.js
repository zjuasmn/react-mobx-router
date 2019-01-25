import React from "react";
import {matchPath, resolve} from "./utils";
import {inject, observer} from "mobx-react";
import Redirect from "./Redirect";
import Route from "./Route";
import invariant from "invariant";
const debug = require('debug')('react-mobx-router:Switch');
/**
 * The public API for rendering the first <Route> that matches.
 */
@inject('history', 'match')
@observer
export default class Switch extends React.Component {
  _getAliasMatchPath = (route) => {
    const {history: {location: {pathname}}, match: {url}} = this.props;
    return !!route.props.alias ? matchPath(pathname, resolve(url, route.props.alias || ''), route.props) : null
  };
  render() {
    debug('update:', this.props);
    const {children, history: {location: {pathname}}, match: {url}, ...props} = this.props;
    const routes = React.Children.toArray(children);
  
    for (let i = 0, length = routes.length; i < length; ++i) {
      let route = routes[i];
      let match = null;
      
      if (route.type === Route) {
        match = matchPath(pathname, resolve(url, route.props.path || ''), route.props) || this._getAliasMatchPath(route);
      } else if (route.type === Redirect) {
        match = matchPath(pathname, resolve(url, route.props.from || ''), route.props);
      } else {
        invariant(false, 'Children of Switch must be Route or Redirect.');
      }
      if (match) {
        return React.cloneElement(route, {computedMatch: match, ...props});
      }
    }
    return null
  }
}