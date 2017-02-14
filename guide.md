# Guide


## Installation

{% method -%}
Using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/):
{% common -%}
```
$ npm install --save react-mobx-router
$ yarn add react-mobx-router
```
{% endmethod %}


Use CDN

- Assuming `react` is imported.(Since you are development a react project) 
- Import `mobx` [https://unpkg.com/mobx/lib/mobx.umd.js](https://unpkg.com/mobx/lib/mobx.umd.js)
- The include [https://unpkg.com/react-mobx-router/umd/react-mobx-router.js](https://unpkg.com/react-mobx-router/umd/react-mobx-router.js)

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

You can edit it in [Codepen](http://codepen.io)

{% method -%}
### HTML
```html
<div id='root'></div>
```
{% endmethod %}



### Javascript(ES2015)



```jsx
const {HashRouter as Router, Route, Link} = ReactMobxRouter;
// import {HashRouter as Router, Route, Link} from 'react-mobx-router'

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
          <h2>Home</h2>r
        </div>
      </Route>
      
      <Route path="about">
        <div>
          <h2>About</h2>
        </div>
      </Route>
      
      <Route path="topics" componet='div'>
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
        </div>
      </Route>
  </Router>
);

const Topic = ({topicId}) => (
  <div>
    <h3>{topicId}</h3>
    <Link context to="..">Back to Topics</Link>
  </div>
);

ReactDOM.render(BasicExample,document.getElementById('root');
```
