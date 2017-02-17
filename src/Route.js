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
  @observable match = {};
  
  componentWillMount() {
    this.updateMatch(this.props);
  }
  
  componentWillUpdate() {
    this.updateMatch(this.props);
  }
  
  @action updateMatch(props) {
    let {computedMatch, path, exact, strict, history:{location:{pathname}}, match:{url}} = props;
    let match = computedMatch || matchPath(pathname, resolve(url, path), {exact, strict});
    if (!match) {
      this.match.url = null;
    } else {
      extendObservable(this.match, match);
    }
  }
  
  render() {
    let {computedMatch, path, exact, strict, history:{location:{pathname}}, match:{url}, ...props} = this.props;
    
    return this.match.url && <Provider match={this.match}>
        <Delegate watch {...props} {...this.match.params}/>
      </Provider>;
    
  }
}
