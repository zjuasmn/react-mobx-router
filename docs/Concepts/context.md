# context

`Router` provide a context with `history` and `match` object using `Provider` from `mobx-react`. So every component in it can get it using `inject` method or `@inject` decorator. Each `Route` would populate new `math` object and provide it to its descendant elements, so a component would only get `match` from innermost `router`.

```jsx
@inject('match')
class User extends React.Component{
  render(){    
    return <div>path: {this.props.match.path} id: {this.props.match.params.id}</div>
  }
}


<Route path='/user/:id'>
  <Route path='friend/:id' component={<User />}/>
</Route>
// If URL is `/user/1/friend/2, it would render
<div>path: friend/:id id: 2</div>
```

##Links
[`history`](history.md)
[`mobx-react`](https://github.com/mobxjs/mobx-react)
[`inject`](https://github.com/mobxjs/mobx-react/#provider-and-inject)









