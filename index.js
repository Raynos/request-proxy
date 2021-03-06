var extend = require("xtend/mutable")
var request = require("request")

var defaults = {
    protocol: "http",
    host: "localhost"
}

module.exports = RequestProxy

function buildUri(options) {
    if (typeof options === "number") {
        options = { port: options }
    } else if (!options) {
        options = {}
    }

    var protocol = options.protocol || defaults.protocol
    var host = options.host || defaults.host
    var uri = protocol + "://" + host

    if (options.port) {
        uri = uri + ":" + options.port
    }

    if (options.path) {
        uri = uri + options.path
    }

    return uri
}

function RequestProxy(options) {
    var baseUri = null

    if (typeof options === "string") {
        baseUri = options
    } else {
        baseUri = buildUri(options)
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
