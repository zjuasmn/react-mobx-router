# NavLink

`NavLink` is just a shortcut method of following code.

```jsx
const NavLink=()=>{
let {to, context, replace, activeClassName, activeStyle, onClick, target, children, ...oProps} = this.props;
return (
<Match path={to} _={({match}) => match ? {className: activeClassName, style: activeStyle} : null} {...oProps}>
<Link to={to} context={context} replace={replace} onClick={onClick} target={target} children={children}/>
</Match>);
}
```

Besides props in Link, NavLink receive `activeClassName` and `activeStyle` and put it in `className` and `style` when it gets match on current path. 
