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
      
      <Route exact component={Page}>
        Home
      </Route>
      
      <Route path="about" component={<Page>About</Page>}/>
      
      <Route path="topics" component="div">
        <h2>Topics</h2>
        <ul>
          <li><Link context to='rendering'>Rendering with React</Link></li>
          <li><Link context to='components'>Components</Link></li>
          <li><Link context>Link without `to`</Link></li>
        </ul>
        <Route exact>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path=':topicId'>
          <Topic />
        </Route>
      </Route>
    </div>
  </Router>
);
const Page = ({children, ...props}) => <div><h2>{children}</h2></div>;
const Topic = ({topicId}) => (<div>
  <h3>{topicId}</h3>
  <Link context to="..">Back to Topics</Link>
</div>);

export default BasicExample