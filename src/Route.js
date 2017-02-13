import React, {PropTypes} from 'react'
import matchPath from './matchPath'
import {observable, action, extendObservable} from 'mobx'
import {observer, inject, Provider} from 'mobx-react'

const defaultMapping = ({match:{params}, computedMatch, path, exact, strict, component, render, history, ...props}) =>
  ({...params, ...props});


@inject('history', 'match')
@observer
export default class Route extends React.Component {
  @observable _match = {};
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
    mapping: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ])
  };
  static defaultProps = {
    mapping: defaultMapping
  };
  
  componentWillMount() {
    this.updateMatch(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.updateMatch(nextProps);
  }
  
  @action updateMatch(props) {
    
    let {computedMatch, path, exact, strict} = props;
    // console.log(props.history.location.pathname, path);
    extendObservable(this._match, computedMatch || matchPath(props.history.location.pathname, path, {
        exact,
        strict
      }) || {url: null});
  }
  
  render() {
    const {path, exact, strict, component:Comp, render,  history, match:matchContext, mapping, ...props} = this.props;
    let {children, ...oProps} = props;
    const match = this._match;
    // const match = matchPath(history.location.pathname, path, {exact, strict});
    // if (render) {
    //   return <Provider match={match}>
    //     {render({match, ...this.props})}
    //   </Provider>
    // }
    if (match.url) {
      
      //   if (Comp) {
      //     return <Provider match={match}>
      //       <Comp {...matchProps}/>
      //     </Provider>;
      //   } else if (children) {
      const matchProps = mapping({match, ...oProps});
      return <Provider match={match}>
        {React.cloneElement(React.Children.only(children), {...matchProps})}
      </Provider>;
      // }
    }
    
    return null;
  }
}
