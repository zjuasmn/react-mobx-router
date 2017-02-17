# match

The `match` object contains information about how a `<Route path>` matched the URL. match objects may contain the following properties:

- **params**
  - type: `object`
  - default: `{}`
  
Key/value pairs parsed from the URL corresponding to the dynamic segments of the path. 

- **path**
  - type: `string`

The `path` prop in innermost `Route`.



- **url**
  - type: `string`

The matched prefix of the URL.

- **isExact**  
  - type: `bool`
  
True if the entire URL was matched(`url==history.location.pathname`)

`match` object can be get by inject it to your component


```jsx
@inject('match')
class MyView extends React.Component {
  render(){    
    return <div>Current matched URL is: {this.props.match.url}</div>
  }
}
```


##Links
[`inject`](context.md)







