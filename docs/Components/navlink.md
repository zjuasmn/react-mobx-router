# NavLink

`NavLink` is just a shortcut method of

```jsx

const NavLink=({to, component:Comp,replace, exact, strict activeClassName ...props}) =>
  <Match path={to} exact strict mapping={}>
    {component
     ? <Comp active><Link to={to} {...props}</Link></Comp>
     : <Link to={to} {...props}>
    }
  </Match>
```