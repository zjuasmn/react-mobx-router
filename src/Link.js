import React, {PropTypes} from 'react'
import {inject} from 'mobx-react'

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

/**
 * The public API for rendering a router-aware <a>.
 */
@inject('history')
class Link extends React.Component {
  
  static propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.string,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  };
  
  static defaultProps = {
    replace: false
  };
  
  handleClick = (event) => {
    if (this.props.onClick)
      this.props.onClick(event);
    
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      
      let {replace, to, history} = this.props;
      if(typeof to === 'string' && to[0] == '.'){
        to = history.location.pathname+to.substr(1);
    
      }
      if (replace) {
        history.replace(to)
      } else {
        history.push(to)
      }
    }
  };
  
  render() {
    
    let {replace, to, history, ...props} = this.props; // eslint-disable-line no-unused-vars
    window.h = history;
    if(typeof to === 'string' && to[0] == '.'){
      to = history.location.pathname+to.substr(1);
     
    }
    const href = history.createHref(
      typeof to === 'string' ? {pathname: to} : to
    );
    
    return <a {...props} onClick={this.handleClick} href={href}/>
  }
}

export default Link