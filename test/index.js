var test = require("tape")
var parseUrl = require("url").parse
var mockery = require("mockery")
var mockback = null

mockery.registerMock("request", function() {
    mockback.apply(this, arguments)
})
mockery.enable()
mockery.warnOnUnregistered(false)

var requestProxy = require("../index")

test("requestProxy is a function", function (assert) {
    assert.equal(typeof requestProxy, "function")
    assert.end()
})

test("requestProxy passes on the callback", function(assert) {
    var cb = function() {}
    mockback = function(uri, fn) {
        assert.equal(fn, cb)
        assert.end()
    }
    requestProxy()("", cb)
})

test("requestProxy defaults to http://localhost", function(assert) {
    var baseUri = "http://localhost"
    mockback = function(uri, fn) {
        assert.equal(uri, baseUri)
        assert.end()
    }
    requestProxy()("", null)
})

test("requestProxy uses uri string provided", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    mockback = function(uri, fn) {
        assert.equal(uri, baseUri)
        assert.end()
    }
    requestProxy(baseUri)("", null)
})

test("requestProxy accepts a single port number", function(assert) {
    var port = 8080
    mockback = function(uri, fn) {
        assert.equal(+parseUrl(uri).port, port)
        assert.end()
    }
    requestProxy(port)("", null)
})

test("requestProxy accepts an options object", function(assert) {
    var opts = {
        host: "example.com",
        path: "/hello/world",
        port: 8080
    }
    mockback = function(uri, fn) {
        var parsedUrl = parseUrl(uri)
        assert.equal(parsedUrl.hostname, opts.host)
        assert.equal(parsedUrl.path, opts.path)
        assert.equal(+parsedUrl.port, opts.port)
        assert.end()
    }
    requestProxy(opts)("", null)
})

test("requestProxy appends request path to base uri", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    var requestPath = "/bar/qux"
    mockback = function(uri, fn) {
        assert.equal(uri, baseUri + requestPath)
        assert.end()
    }
    requestProxy(baseUri)(requestPath, null)
})

test("requestProxy appends uri option to base uri", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    var requestPath = "/bar/qux"
    mockback = function(uri, fn) {
        assert.equal(uri.uri, baseUri + requestPath)
        assert.end()
    }
    requestProxy(baseUri)({ uri: requestPath }, null)
})

test("requestProxy appends url option to base uri", function(assert) {
    var baseUri = "https://example.com:8080/foo"
    var requestPath = "/bar/qux"
    mockback = function(uri, fn) {
        assert.equal(uri.url, baseUri + requestPath)
        assert.end()
    }
    requestProxy(baseUri)({ url: requestPath }, null)
})