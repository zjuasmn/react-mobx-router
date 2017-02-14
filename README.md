# Link

`Link` provides declarative, accessible navigation around your application.
## properties

```jsx
<Link to='/user'>user</Link>
```

- **to**
  - type: `string` | `object`
  - default: null
  - example: `/about` `..` `./edit` `{pathname: './courses',search: '?sort=name', hash: '#the-hash', state: { fromDashboard: true }}`
  
the location to link to, support relative navigation.

- **replace**
  - type: `bool`
  - default: false
  
Whether `replace` the current entry in `history` instead of adding a new one, which is the default behavior of `push`.


- **context**
  - type: `bool`
  - default: false
If `true`, navigation is based on matched url in  inner most `Route` holds this `Link`.

```jsx
// Current URL is `/user/123`

<Route path='/user' component='div>
  <Link context to='./books'></Link> {/* navigate to `/user/books` */}
  <Link to='./books'>Edit</Link> {/* navigate to `/user/123/books` */}
</Route>
```