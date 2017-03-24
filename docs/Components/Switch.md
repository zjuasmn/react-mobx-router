# Switch

Renders the **FIRST** child `<Route/>` or `<Redirect>` that matches the location. At most ONE child would be rendered.

```jsx
<Switch >
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

# Props
- **...props**

All props would pass down to rendered children.

```jsx
<Switch className='main'>
  <Route component={Home} />
  <Route path='/about' component={About}/>
</Switch>
```

is same as 
```jsx
<Switch>
  <Route component={Home} className='main'/>
  <Route path='/about' component={About} className='main'/>
</Switch>
```


