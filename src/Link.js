import React, {PropTypes} from 'react'
import {inject} from 'mobx-react'
import {resolve} from './Utils'

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

@inject('history', 'match')
export default class Link extends React.Component {
  
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
  
  _getLocation = () => {
    let {to, context, history, match} = this.props;
    let basePath = context ? match.url : history.location.pathname;
    
    if (typeof to === 'string') {
      return {pathname: resolve(basePath, to)};
    } else {
      let {pathname, ...oProps} = to;
      return {
        pathname: resolve(basePath, pathname),
        ...oProps
      }
    }
  };
  
  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      
      let {history, replace} = this.props;
      let _to = this._getLocation();
      replace ? history.replace(_to) : history.push(_to);
    }
  };
  
  
  render() {
    let {to, context, replace, history, match, ...oProps} = this.props;
    if (to == null){
      return <a href="javascript:" {...oProps} />
    }
    const href = history.createHref(this._getLocation());
    return <a {...oProps} onClick={this.handleClick} href={href}/>
  }
}

