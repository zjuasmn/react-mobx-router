# Dynamic matching

The matching of `<Route />`  and `<Match />` can be dynamic updated in runtime.

Check live demo in [Dynamic matching](http://codepen.io/zjuasmn/pen/evKByq?editors=0011)

![](/assets/ezgif-3-4ce823e91d.gif)

```js
class A {
  @observable config = {
    path: '/',
    exact: false,
    strict: false
  };
}
let a = new A();

const App = observer(
  () => <div>
    <div>
    <input value={a.config.path} onChange={e=>a.config.path=e.target.value} /> 
      <input type='checkbox' checked={a.config.exact} onChange={e=> a.config.exact=e.target.checked}/> exact
      <input type='checkbox' checked={a.config.strict} onChange={e=>a.config.strict=e.target.checked}/> strict
    </div>
    <Route path={a.config.path} exact={a.config.exact} strict={a.config.strict}>
      <div>it matches!</div>
    </Route>
  </div>)
```



