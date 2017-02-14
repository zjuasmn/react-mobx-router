import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from '../src'
import {observer} from 'mobx-react'
const Model = observer(({model, children}) => {
  console.log('model update');
  return <div>
    <h1>modelName: {model}</h1>
    {children}
  </div>
});
const Detail = observer(({id, children}) => {
  console.log('id update');
  return <div>
    <h1>modelid: {id}</h1>
    {children}
  </div>
});
const Edit = observer(() => {
  console.log('edit update');
  return <div>
    Edit mode.
  </div>
});

const UpdateApp = ()=>(<Router>
  <Route path='/:model' component={Model}>
    <Route path=':id' component={Detail}>
      <Route path='edit' component={Edit}/>
    </Route>
  </Route>
</Router>);

export default UpdateApp;

