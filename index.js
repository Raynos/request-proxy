var extend = require("xtend/mutable")
var request = require("request")

var defaults = {
    protocol: "http",
    host: "localhost"
}

module.exports = RequestProxy

function RequestProxy(options) {
    if (typeof options === "number") {
        options = { port: options }
    } else if (!options) {
        options = {}
    }

    var port = options.port || -1
    var protocol = options.protocol || defaults.protocol
    var host = options.host || defaults.host

    var baseUri = protocol + "://" + host + ":" + port

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
