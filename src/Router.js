import React from "react";
import History from "mobx-history/History";
import {Provider} from "mobx-react";
import invariant from "invariant";
const defaultMatch = {
  path: '',
  url: '',
  params: {}
};
const historyProp = (props, propName, componentName) => {
  if (!(props[propName] instanceof History)) {
    return new Error(`Invalid prop \`${propName}\` supplied to ${componentName}. Only \`mobx-history\` object can be set. Validation failed.`)
  }
};

export default class Router extends React.Component {
  static propTypes = {
    history: historyProp,
  };
  
  componentWillReceiveProps(nextProps) {
    invariant(nextProps.history === this.props.history, 'history should not change.');
  }
  
  render() {
    const {children, history} = this.props;
    return <Provider history={history} match={defaultMatch}>{children}</Provider>;
  }
}
