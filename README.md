# request-proxy

<!-- [![browser support][5]][6] -->

<!-- [![build status][1]][2] [![Coverage Status][9]][10] [![davis dependency status][3]][4] [![gemnasium Dependency Status][11]][12] [![NPM version][7]][8] -->

A version of request that's local to a fixed base uri

## Example

```js
var RequestProxy = require("request-proxy")

var request = RequestProxy({
  host: "localhost",
  port: 8080
})

// requesting to http://localhost:8080/foo
request("/foo", function (err, res, body) {
  /* do stuff */
})
```

## Installation

`npm install request-proxy`

## Contributors

 - Raynos
 - pluma

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/request-proxy.png
  [2]: https://travis-ci.org/Raynos/request-proxy
  [3]: https://david-dm.org/Raynos/request-proxy.png
  [4]: https://david-dm.org/Raynos/request-proxy
  [5]: https://ci.testling.com/Raynos/request-proxy.png
  [6]: https://ci.testling.com/Raynos/request-proxy
  [7]: https://badge.fury.io/js/request-proxy.png
  [8]: https://badge.fury.io/js/request-proxy
  [9]: https://coveralls.io/repos/Raynos/request-proxy/badge.png
  [10]: https://coveralls.io/r/Raynos/request-proxy
  [11]: https://gemnasium.com/Raynos/request-proxy.png
  [12]: https://gemnasium.com/Raynos/request-proxy
