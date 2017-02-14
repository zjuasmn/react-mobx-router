# react-mobx-router

Declarative routing for `React` with `mobx` magic!
## You can read the whole document **[HERE](https://zjuasmn.gitbooks.io/react-mobx-router/)**

## Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/):

```
$ npm install --save react-mobx-router
$ yarn add react-mobx-router
```

Use CDN

- Assuming `react` is imported since you are development a react project.
- Import `mobx` [https://unpkg.com/mobx/lib/mobx.umd.js](https://unpkg.com/mobx/lib/mobx.umd.js)
- Import `react-mobx-router` [https://unpkg.com/react-mobx-router/umd/react-mobx-router.js](https://unpkg.com/react-mobx-router/umd/react-mobx-router.js)

Then get the `Router` `Route` `Link` component as below


```jsx
// using ES6 modules
import {BrowserRouter, Route, Link} from 'react-mobx-router'
// or if you concern about bundle size.
import BrowserRouter from 'react-mobx-router/BrowserRouter'

// using CommonJS modules
var Route = require('react-mobx-router').Router

// using CDN
var Link = ReactMobxRouter.Link
```

## Getting started
Below is a modified version of `BasicExample` in [`React Router(v4)`](https://reacttraining.com/react-router/examples/basic)

You can edit it in [Codepen](http://codepen.io/zjuasmn/pen/KaJyYz?editor=0010)

### HTML
```html
<div id='root'></div>
```

### Javascript(ES2015)



```jsx
const {HashRouter as Router, Route, Link} = ReactMobxRouter;
// import {HashRouter as Router, Route, Link} from 'react-mobx-router'

const App = () => (  
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
);
const Page = ({children, ...props}) => <div><h2>{children}</h2></div>;
const Topic = ({topicId}) => (<div>
  <h3>{topicId}</h3>
  <Link context to="..">Back to Topics</Link>
</div>);

ReactDOM.render(<Router><App/></Router>,document.getElementById('root');
```
