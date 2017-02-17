# precise update

With the help of `isElementShallowEqual` in `react-utilities`, `Route` can precisely update its children.


```jsx
const Model = ({model, children}) => {
  console.log('model update');
  return <div>
    <h1>modelName: {model}</h1>
    {children}
  </div>
});
const Detail = ({id, children}) => {
  console.log('id update');
  return <div>
    <h1>modelid: {id}</h1>
    {children}
  </div>
};
const Edit = () => {
  console.log('edit update');
  return <div>
    Edit mode.
  </div>
};

const App = ()=>(<Route path='/:model' component={Model}>
    <Route path=':id' component={Detail}>
      <Route path='edit' component={Edit}/>
    </Route>
  </Route>);

```

When changing URL from `/user/1/edit` to `/book/1/edit`, `Detail` and `Edit` would not update since they only concern about `id` and `edit` part in URL. 
