import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from '../src'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      
      <hr/>
      
      <Route exact>
        <div>
          <h2>Home</h2>
        </div>
      </Route>
      
      <Route path="about">
        <div>
          <h2>About</h2>
        </div>
      </Route>
      
      <Route path="topics">
        <div>
          <h2>Topics</h2>
          <ul>
            <li><Link relative to='rendering'>Rendering with React</Link></li>
            <li><Link relative to='components'>Components</Link></li>
            <li><Link relative>Link without `to`</Link></li>
          </ul>
          <Route exact>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path=':topicId'>
            <Topic />
          </Route>
        </div>
      </Route>
    </div>
  </Router>
);

const Topic = ({topicId}) => (
  <div>
    <h3>{topicId}</h3>
    <Link relative to="..">Back to Topics</Link>
  </div>
);

export default BasicExample