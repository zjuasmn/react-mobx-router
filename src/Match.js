import React from "react";
import PropTypes from "prop-types";
import {action, extendObservable, observable} from "mobx";
import {inject, observer} from "mobx-react";
import {matchPath, resolve} from "./utils";
import {RenderablePropType} from "react-utilities/utils";
import Delegate from "react-utilities/Delegate";

@inject('history', 'match')
@observer
export default class Match extends React.Component {
  @observable match = {};
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    component: RenderablePropType,
  };
  static defaultProps = {
    exact: false,
    strict: false,
  };
  
  render() {
    let {computedMatch, path, exact, strict, history:{location:{pathname}}, match:{url}, ...props} = this.props;
    let match = computedMatch || matchPath(pathname, resolve(url, path), {exact, strict});
    
    return <Delegate match={match} {...props}/>;
  }
}

