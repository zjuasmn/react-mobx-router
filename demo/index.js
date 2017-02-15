import React from 'react'
import {render} from 'react-dom'
import App from './basic'
import Navigator from './Navigator'
import Router from '../src/MemoryRouter'
import './style.css'
// import App from './update'
const mountNavigator = (router)=>{
  render(<Navigator history={router.history}/>, document.getElementById('navigator'));
};
render(<Router ref={mountNavigator}><App/></Router>, document.getElementById('root'));

