# Route

## Behaviour

When a `Route` matches current URL, the default behaviour is pass matching URL params to rendered element. This behavior can be changed via `mapping` properties.

```jsx

<Route path='/user/:userId'>
  <User />
</Route>
// when URL is `/user/alice`, it would render
<User userId='alice' />

<Route path='/user/:userId'>  
  <Route path='./friend/:userId'>
    <User />
  </Route>
</Route>
// when URL is `/user/alice/friend/bob`, it would render
<User userId='bob' />
```

  
  
## Properties

- **path**
 - type: `string`
 - default: `""`
 - example: `/author` `/author/:id` `../book`

Any valid URL path that [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) understands. Relative path would be resolved as node [`path.resolve`](https://nodejs.org/dist/latest-v6.x/docs/api/path.html#path_path_resolve_paths) do using current router as base directory.

```jsx
 <Route path='/author/:id' component='div'>
   <div> Author name </div>
   <Route path='./books'>
     <Books />
   </Route>
 </Route>
```

equivalents to 
```jsx
 <Route path='/author/:id' component='div'>
   <div> Author name </div>
   <Route path='/author/:id/books'>
     <Books />
   </Route>
 </Route>
```

- **exact**
 - type: `bool`
 - default: `false`

When true, will only match if the path matches the location.pathname exactly.

```jsx
<Route exact path='/author' component='div'>
  This would not show when pathname is `/author/123`.
</Route> 
<Route path='/author' component='div'>
  This would show when pathname is `/author/123`. </Route>
```

- **component**
 - type: `string` | `Component` | `node`
 - default: `null`
 - example: `'div'` `UserDetail` `<UserDetail />` `({name})=><div>{name}</div>`

Component to render when route matches. When `component` is `node`, `children` would be ignored, otherwise, router would return `React.createElement(component,{children,...props})`.

```jsx
<Route component='div'>
  name
</Route> 
// would render <div>name</div>
<Route component={UserDetail}>
  name
</Route> 
// would render <UserDetail>name</div>

<Route component={<UserDetail>alice</UserDetail>}>
  name
</Route> 
// would render <UserDetail>alice</UserDetail>

<Route>
  <div>name</div>
</Route>
// would render <div>name</div>
```


- **mapping**

  type: `object` | `function`
  default: 
```js
   ({match:{params}, path, exact, strict, mappings, component, render, ...props) => ({...params,...props})
```

`mapping` defines how the properties of `Route` would pass to its rendered element. By default, only params would pass since it is the most wanted behavior. you might want to change it to conform children properties type definitions.

For example, we might want to use [`react-mobx-utils/Resolve`](https://github.com/zjuasmn/react-mobx-utils#resolve) to resolve promise of fetching data from server based on params on URL.
```jsx
let myMapping = ({match:{params}) => ({promise
server.getUserbyId(params.id)})

<Route path=`/user/:id` mapping={myMapping}>
  <Resolve name='user'>
    <User />
  </Resolve>
</Route>
// when URL is `/user/123`, it would render
<Resolve name='user' promise={server.getUserbyId(123)}>
  <User />
</Resolve>
// After successfully fetching from server with {name:"alice",id:"123"}, it would render
<User user={{name:"alice",id:"123"}}/>
```


- **...props**

Rest properties would pass to rendered element as it is, with original element properties taking precedence.

```jsx

<Route style={{color:'red'}} className='user'>
<div style={{color:'blue'}} >alice</div>
</Route>
// would render
<div style={{color:'blue'}} className='user'>alice</div>

```