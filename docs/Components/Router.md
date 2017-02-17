# Router

`Router` is a component providing `history` and `match` context to its children. 

Most of the time, you won't use `Router` directly, since we provide `BrowserRouter`, `HashRouter`, `MemoryRouter` to initiliza `Router` with correspondent `history`.

Check [`history`](https://github.com/ReactTraining/history#usage) document for property definitions of these three Routers.

# BrowserRouter
```jsx
<BrowserRouter
  basename=''
  forceRefresh={false}
  keyLength={6}
  getUserConfirmation={optionalFunc(message, callback) => callback(window.confirm(message))}
>
  <App/>
</BrowserRouter>
```

## HashRouter
```jsx
<HashRouter
  basename=''
  hashType='slash'
  getUserConfirmation={(message, callback) => callback(window.confirm(message))}
>
  <App/>
</HashRouter>
```

## MemoryRouter
```jsx
<MemoryRouter
  initialEntries={['/']}
  initialIndex={0}
  keyLength={6}
  getUserConfirmation={null}
>
  <App/>
</MemoryRouter>
```

## Props
- **history** `required`
  - type: `mobx-history`
  
The `history` object for navigation.

- **children** 

A single child element to render.




