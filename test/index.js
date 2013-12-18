var test = require("tape")
var parseUrl = require("url").parse
var rewire = require("rewire")
var requestProxy = rewire("../index.js")

test("requestProxy is a function", function (assert) {
    assert.equal(typeof requestProxy, "function")
    assert.end()
})

test("requestProxy passes on the callback", function(assert) {
    var cb = function() {}
    requestProxy.__set__("request", function(uri, fn) {
        assert.equal(fn, cb)
        assert.end()
    })
    requestProxy()("", cb)
})

test("requestProxy defaults to http://localhost", function(assert) {
    var baseUri = "http://localhost"
    requestProxy.__set__("request", function(uri, fn) {
        assert.equal(uri, baseUri)
        assert.end()
    })
    requestProxy()("", null)
})

test("requestProxy uses uri string provided", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    requestProxy.__set__("request", function(uri, fn) {
        assert.equal(uri, baseUri)
        assert.end()
    })
    requestProxy(baseUri)("", null)
})

test("requestProxy accepts a single port number", function(assert) {
    var port = 8080
    requestProxy.__set__("request", function(uri, fn) {
        assert.equal(+parseUrl(uri).port, port)
        assert.end()
    })
    requestProxy(port)("", null)
})

test("requestProxy accepts an options object", function(assert) {
    var opts = {
        host: "example.com",
        path: "/hello/world",
        port: 8080
    }
    requestProxy.__set__("request", function(uri, fn) {
        var parsedUrl = parseUrl(uri)
        assert.equal(parsedUrl.hostname, opts.host)
        assert.equal(parsedUrl.path, opts.path)
        assert.equal(+parsedUrl.port, opts.port)
        assert.end()
    })
    requestProxy(opts)("", null)
})

test("requestProxy appends request path to base uri", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    var requestPath = "/bar/qux"
    requestProxy.__set__("request", function(uri, fn) {
        assert.equal(uri, baseUri + requestPath)
        assert.end()
    })
    requestProxy(baseUri)(requestPath, null)
})

test("requestProxy appends uri option to base uri", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    var requestPath = "/bar/qux"
    requestProxy.__set__("request", function(uri, fn) {
        assert.equal(uri.uri, baseUri + requestPath)
        assert.end()
    })
    requestProxy(baseUri)({ uri: requestPath }, null)
})

test("requestProxy appends url option to base uri", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    var requestPath = "/bar/qux"
    requestProxy.__set__("request", function(uri, fn) {
        assert.equal(uri.url, baseUri + requestPath)
        assert.end()
    })
    requestProxy(baseUri)({ url: requestPath }, null)
})