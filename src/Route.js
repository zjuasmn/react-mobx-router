import React, {PropTypes} from 'react'

import {observable, action, extendObservable} from 'mobx'
import {observer, inject, Provider} from 'mobx-react'
import {resolve,matchPath} from './Utils'
import Match from './Match'

// const defaultMapping = ({match:{params}, computedMatch, path, exact, strict, component, render, history, ...props}) =>
//   ({...params, ...props});
const defaultMapping = ({match:{params}, computedMatch, component, render, ...props}) =>
  ({...params, ...props});

@inject('history', 'match')
@observer
export default class Route extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    render: PropTypes.func,
  };
  static defaultProps = {
    path: '',
    exact: false,
    strict: false,
  };
  
  render() {
    let {computedMatch,path, exact, strict, render, history, match, ...props} = this.props;
    
    const _match = computedMatch || matchPath(history.location.pathname, resolve(match.url, path), {exact, strict});
    if (render) { // render would be call whether match or not.
      return render({match: _match, path, exact, strict, ...props});
    } else {
      return _match && <Match computedMatch={_match} {...props}/>;
    }
    
  }
}
