import React, {PropTypes} from "react";
import {observable, action, extendObservable} from "mobx";
import {observer, inject, Provider} from "mobx-react";
import {resolve, matchPath} from "./utils";
import Delegate from "react-utilities/Delegate";
import {RenderablePropType} from "react-utilities/utils";
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
    exact: false,
    strict: false,
  };
  componentWillReact() {
    debug("I will re-render, since the route has changed!");
  }
  render() {
    debug('update:', this.props);
    let {computedMatch, path, exact, strict, history:{location:{pathname}}, match:{url}, ...props} = this.props;
    let match = computedMatch || matchPath(pathname, resolve(url, path), {exact, strict});
    return match && <MatchProvider match={match}>
        <Delegate {...props} {...match.params}/>
      </MatchProvider>;
    
  }
}

class MatchProvider extends React.Component{
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
  render(){
    return <Provider match={this.match}>{this.props.children}</Provider>
  }
}