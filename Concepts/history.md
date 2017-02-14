# history

`history` in this document refers to `mobx-history`, which is a mobx wrapper of `history` to make some of its properties `observable` by `mobx`. You can use it as orignal `history` object.

```javascript
@inject('history')
class GoBackLink extends React.Component{
  render(){
    return <a onClick={this.props.goBack>Back</a>;
  }
}
```

##Links
[`history`](https://github.com/ReactTraining/history)
[`mobx-history`](https://github.com/zjuasmn/mobx-history)






