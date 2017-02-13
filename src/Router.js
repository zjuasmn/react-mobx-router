import React, {PropTypes} from 'react'
import History from 'mobx-history/History'
import {Provider} from 'mobx-react'

/**
 * The public API for putting history on context.router.
 */
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
    match: PropTypes.object
  };
  static defaultProps = {
    match: defaultMatch
  };
  
  componentWillMount() {
    this.props.history.startListen();
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.history != this.props.history) {
      this.props.history.stopListen();
    }
  }
  
  componentWillUnmount() {
    this.props.history.stopListen();
  }
  
  render() {
    const {match, children, history} = this.props;
    return <Provider history={history} match={match}>{children}</Provider>;
  }
}
