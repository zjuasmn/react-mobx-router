import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

@observer
export default class Navigator extends Component {
  input;
  changeURL = action((e) => {
    e.preventDefault();
    let history = this.props.history;
    history.location = this.input.value;
  });

  render() {
    let {history} = this.props;
    
    console.log(history.location.pathname);
    return (
      <div className="navigator">
        <a href='javascript:' onClick={history.goBack} disabled={!history.canGo(-1)}>&lt;</a>
        <a href='javascript:' onClick={history.goForward} disabled={!history.canGo(1)}>&gt;</a>
        <form onSubmit={this.changeURL}>
          <input key={history.location.pathname} type="text" defaultValue={history.location.pathname}
            ref={input=>{this.input=input}}
          />
        </form>
      </div>);
  }
}
/*
 
 */