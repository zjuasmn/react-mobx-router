import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import CSSModules from 'react-css-modules'


export default class CMSApp extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {className, ...props} = this.props;
    return (
      <div styleName='' className={className} {...props}>
        <Switch>
          <Route exact path='.' props={() => ({value: Server.find(modelName)})}>
            <Resolve name={modelName}>
              <ListView model={modelName}/>
            </Resolve>
          </Route>
          <Route exact path='./:id' props={() => ({value: Server.findBy(modelName)})}>
            <Resolve name={modelName}>
              <ItemView model={modelName}/>
            </Resolve>
          </Route>
          
        </Switch>
      </div>);
  }
}