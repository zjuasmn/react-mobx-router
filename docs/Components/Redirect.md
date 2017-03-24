# Redirect

Rendering a `<Redirect />` will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.


# Props

- **from**
  - type: `string`
  - default: `""`

same as `path` in `Route`

- **to**
  - type: `string` | `object`
  - default: null

same as `to` in `Link`

- **push**
  - type: `boolean`
  - default: `false`

The default behavior of Redirect is to replace `from` to `to` in `History`, if `push` is `true`, then `push` is used to change the `History`.

