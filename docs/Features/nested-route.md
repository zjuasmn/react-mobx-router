# Nested Route

A `<Route />` can contain other `<Route />` as its children, making it easy to represent nested views.

Nested route would take its parent's path as base path when its path prop is not absolute path.

```jsx
<Route path='/user/:id' component='div'>
  <div>
     // ... some markup about the user
  </div>
  <div>
    <Route path='books'>
       //... render when path is like `/user/123/books`
    </Route>
  </div>
  <Route path='../books'>
    //... render when path is `/user/books`
  </Route>
  <Route path='/books'>
    //... will never render because when url is `/books`, parent route is hidden.
  </Route>
</Route>
```




