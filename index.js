var extend = require("xtend/mutable")
var request = require("request")
var url = require("url")

var defaults = {
    protocol: "http",
    hostname: "localhost"
}

module.exports = RequestProxy

function RequestProxy(options) {
    if (typeof options === "number") {
        options = { port: options }
    } else if (!options) {
        options = {}
    }

    if (typeof options === "string") {
        var baseUri = options
    } else {
        var baseUri = url.format(extend({}, defaults, options))
    }

    extend(requestProxy, request)

    return requestProxy

    function requestProxy(uri, callback) {
        if (typeof uri === "string") {
            uri = baseUri + uri
        } else if (uri.uri) {
            uri.uri = baseUri + uri.uri
        } else if (uri.url) {
            uri.url = baseUri + uri.url
        }

        request(uri, callback)
    }
}
