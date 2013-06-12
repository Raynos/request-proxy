var test = require("tape")

var requestProxy = require("../index")

test("requestProxy is a function", function (assert) {
    assert.equal(typeof requestProxy, "function")
    assert.end()
})
