import React, {PropTypes} from "react";
import {observable, action, extendObservable} from "mobx";
import {observer, Provider} from "mobx-react";

// const defaultMapping = ({match:{params}, computedMatch, path, exact, strict, component, render, history, ...props}) =>
//   ({...params, ...props});
const defaultMapping = ({match:{params}, computedMatch, component, render, ...props}) =>
  ({...params, ...props});
const buildElement = (Comp, props, children) => !!Comp && (React.isValidElement(Comp) ? React.cloneElement(Comp, props) :
  <Comp {...props}>{children}</Comp>);
const PropTypeFuncOrElememt = React.PropTypes.oneOfType([PropTypes.func, PropTypes.element]);

@observer
export default class Match extends React.Component {
  @observable match = {};
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    mapping: PropTypes.func,
    component: PropTypeFuncOrElememt,
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
    extendObservable(this.match, props.computedMatch);
  }
  
  render() {
    const {component, mapping, children, ...props} = this.props;
    const match = this.match;
    const matchProps = mapping({match, ...props});
    
    return <Provider match={match}>
      {
        component
          ? buildElement(component, mapping({match, ...props}), children)
          : buildElement(React.Children.only(children), mapping({match, ...props}))
      }
    </Provider>;
  }
}

