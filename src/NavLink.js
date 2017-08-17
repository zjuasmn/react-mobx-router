import React from "react";
import PropTypes from "prop-types";
import Match from "./Match";
import Link from "./Link";

export default class NavLink extends React.Component {
  static propTypes = {
    context: PropTypes.bool,
    onClick: PropTypes.func,
    target: PropTypes.string,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  };

  static defaultProps = {
    to: null,
    replace: false,
    context: false,
  };

  render() {
    let {to, context, replace, activeClassName = 'active', className = '', activeStyle, style = {}, onClick, target, children, ...oProps} = this.props;
    return (
      <Match path={to} _={({match}) => match ? {
        className: className + ' ' + activeClassName,
        style: {...style, ...activeStyle}
      } : {className, style}} {...oProps}>
        <Link to={to} context={context} replace={replace} onClick={onClick} target={target} children={children}/>
      </Match>);
  }
}

