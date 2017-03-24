# Match

`Match` is like `Route`, but it would render its children no matter it matches the `path` or not. Useful when building Route related component like `NavLink`

`Match` would **NOT** create context for its children, so contexted Link would set base path to its nearest `Route`.

```jsx
<Route path=`/user`>
  <Match path=`/user/`>
    <Link context to='.' /> 
    <Link context to='./create' /> 
  </Match>
</Route>
```

```jsx
<Match path=`/users` mapping={{className:{({active})=>active ? 'active' : ''}}>
  <li>
    <Link to=`/users`>Users</Link>
  </li>
</Match>
// When path is `/users` or `/users/alice`, it would render
<li className='active'>
  <Link to='/users'>Users</Link>
</li>
```

or you can use

```jsx
<Match path=`/users`>
  <NavLink to=`/users>Users</NavLink>
</Match>
// where
const NavLink=({active,url,path,params})=>
  <li className={active ? 'active' : ''}>
    <Link to='/users'>Users</Link>
  </li>
```

```jsx
<Match path=`/:modelName`>
  <ModelOverview />
</Match>
// when URL is `/page`
<ModelOverview modelName='page' />
```