import React, {PropTypes} from 'react'
import matchPath from './matchPath'
import {observable, action, extendObservable} from 'mobx'
import {observer, inject, Provider} from 'mobx-react'

const defaultProps = ({match, computedMatch, path, exact, strict, component, render, props, history, ...otherProps}) => otherProps;
/**
 * The public API for matching a single path and rendering.
 */
@inject('history')
@observer
export default class Route extends React.Component {
  @observable match = {};
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
    props: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ])
  };
  static defaultProps = {
    props: defaultProps
  };
  
  constructor(props) {
    super(props);
    this.updateMatch(props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.updateMatch(nextProps);
  }
  
  @action updateMatch(props) {
    let {computedMatch, path, exact, strict} = props;
    extendObservable(this.match, computedMatch || matchPath(this.props.history.location.pathname, path, {
        exact,
        strict
      }) || {url:null});
  }
  
  render() {
    const {render, children, component:Comp, props} = this.props;
    const match = this.match;
    
    if (render) {
      return <Provider match={match}>
        {render({match, ...this.props})}
      </Provider>
    }
    if (this.match) {
      const matchProps = props({match, ...this.props});
      if (Comp) {
        return <Provider match={match}>
          <Comp {...matchProps}/>
        </Provider>;
      } else if (children) {
        return <Provider match={match}>
          {React.cloneElement(React.Children.only(children), {...matchProps})}
        </Provider>
      }
    }
    return null;
  }
}
