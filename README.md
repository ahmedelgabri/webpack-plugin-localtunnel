# Webpack plugin localtunnel

Simple plugin to allow you to expose your
[`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/) over
the internet using [`localtunnel`](https://localtunnel.github.io/www/)

## Installation

```sh
yarn add -D webpack-plugin-localtunnel
```

or

```sh
npm install -D webpack-plugin-localtunnel
```

## Usage

```js
const LocaltunnelPlugin = require('localtunnel-webpack-plugin')

module.exports = {
  plugins: [new LocaltunnelPlugin({subdomain: 'my-subdomain'})],
}
```

## Options

| name        | type     | notes                                                                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `subdomain` | `string` | Used to create a custom URL `<subdomian>.loca.it` otherwise a random subdomain will be assigned                                             |
| `port`      | `number` | The port that `localtunnel` needs to listen to. By default the plugin will pick up the `webpack-dev-server` port unless otherwise specified |

Both options are optional, but `subdomain` is recommended to be set so you have
a consistent URL
