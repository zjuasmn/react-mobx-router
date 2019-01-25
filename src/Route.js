import React from "react";
import PropTypes from "prop-types";
import {action, extendObservable, observable} from "mobx";
import {inject, observer, Provider} from "mobx-react";
import {matchPath, resolve} from "./utils";
import Delegate from "react-utilities/Delegate";
import {RenderablePropType} from "react-utilities/utils";
import qs from "qs";
const debug = require('debug')('react-mobx-router:Route');

@inject('history', 'match')
@observer
export default class Route extends React.Component {
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    component: RenderablePropType,
  };
  static defaultProps = {
    path: '',
    alias: '',
    exact: false,
    strict: false,
  };
  get _aliasMatchPath() {
    const { alias, exact, strict, history: { location: { pathname } }, match: { url } } = this.props;
    return !!alias ? matchPath(pathname, resolve(url, alias), { exact, strict }) : null
  };
  render() {
    debug('update:', this.props);
    let {computedMatch, path, alias, exact, strict, history: {location: {pathname, search}}, match: {url}, ...props} = this.props;
    let match = computedMatch
      || matchPath(pathname, resolve(url, path), {exact, strict})
      || this._aliasMatchPath;
    if (match && search && search.length > 1) {
      match.params.search = qs.parse(search.substr(1));
    }
    return match && <MatchProvider match={match}>
        <Delegate {...props} {...match.params}/>
      </MatchProvider>;
    
  }
}

class MatchProvider extends React.Component {
  @observable match = {};
  
  @action updateMatch(props) {
    extendObservable(this.match, props.match);
  }
  
  componentWillMount() {
    this.updateMatch(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.updateMatch(nextProps);
  }
  
  render() {
    return <Provider match={this.match}>{this.props.children}</Provider>
  }
}